<template>
    <PageGachaTitle :class="$style.main" ref="mainRef" />
</template>

<style lang="scss" module>
.main {
    flex: 1;
}
</style>

<script lang="ts" setup>
import { Texture, BufferGeometry, MeshBasicMaterial, AdditiveBlending, Mesh, Vector3, WebGLRenderer, Scene, AmbientLight, SpotLight, PerspectiveCamera, Float32BufferAttribute, PointsMaterial, Points, PlaneGeometry, Object3D, MeshPhongMaterial, FrontSide, BackSide, Group, Color } from "three";
import { SceneUtils } from "three/examples/jsm/Addons.js";

import ParticleImagePath from "~/public/assets/images/games/gacha/particle.webp";
import CardBackImagePath from "~/public/assets/images/games/gacha/card-back.webp";
import BeginAudioPath from "~/public/assets/sounds/games/gacha/begin.mp3";
import SummonAudioPath from "~/public/assets/sounds/games/gacha/summon.mp3";

import BeginMadosoftSrMoviePath from "~/public/assets/sounds/games/gacha/madosoft/begin_sr.mp4";
import BeginMadosoftSsrMoviePath from "~/public/assets/sounds/games/gacha/madosoft/begin_ssr.mp4";
import SummonMadosoftSrAudioPath from "~/public/assets/sounds/games/gacha/madosoft/summon_sr.mp3";
import SummonMadosoftSsrAudioPath from "~/public/assets/sounds/games/gacha/madosoft/summon_ssr.mp3";
import type { GachaItem } from "~/server/api/games/gacha.post";

const interfaceStore = useInterfaceStore();

const mainRef = ref<HTMLElement>();
const isUnmounted = ref<boolean>(false);

onMounted(async () => {
    interfaceStore.visible = true;

    const element = mainRef.value!;
    const cardGeometry = new PlaneGeometry(9.00, 14.40, 1, 1);
    const cardMaterial = new MeshPhongMaterial({
        map: new Texture(await fetch(CardBackImagePath).then(r => r.blob()).then(blob => createImageBitmap(blob, { imageOrientation: "flipY" }))),
        side: BackSide
    });
    const particleGeometry = new PlaneGeometry(0.5, 0.5);
    const particleTexture = new Texture(await fetch(ParticleImagePath).then(r => r.blob()).then(blob => createImageBitmap(blob)));
    const defaultBeginAudio = new Audio(BeginAudioPath);
    const defaultSummonAudio = new Audio(SummonAudioPath);

    cardMaterial.map!.needsUpdate = true;
    particleTexture.needsUpdate = true;

    function getBackgroundParticle(color: number = 0xffffff) {
        const WIDTH = 50;
        const AMOUNT = 100;

        const vertices = [];
        for (let _ = 0; _ < AMOUNT * 3; _++) vertices.push(WIDTH * (Math.random() - 0.5));

        return new Points(new BufferGeometry().setAttribute("position", new Float32BufferAttribute(vertices, 3)), new PointsMaterial({
            size: 0.2,
            color,
        }));
    }
    async function wait(milliseconds: number): Promise<void> {
        await new Promise(r => setTimeout(r, milliseconds));
    }
    async function playMovie(url: string): Promise<void> {
        const video = document.createElement("video");
        video.src = URL.createObjectURL(await fetch(url).then(r => r.blob()));
        video.controls = false;
        element.appendChild(video);

        video.play();
        await new Promise(resolve => video.addEventListener("ended", resolve, { once: true }));
        video.remove();
    }

    enum CardState {
        /** 初期状態 */
        INITIAL = 0,
        /** カードが高速回転中 */
        ROTATING_BEGIN = 1,
        /** カードが回転中 */
        ROTATING = 2,
        /** カードが発光中 */
        FLASHING = 3,
        /** カードが退出中 */
        HIDING = 4,
    }
    interface CardOptions {
        autoplay: boolean;
        beginAudio: HTMLAudioElement | null;
        summonAudio: HTMLAudioElement | null;
    }
    class Card extends Object3D {
        /** カードの演出の状態 */
        private state: CardState = CardState.INITIAL;
        /** カードオブジェクト */
        private object: Group;
        /** カードパーティクル */
        private particle: Points;
        /** カードを照らすライト */
        private light: SpotLight;

        /** カードの回転速度（{@link CardState.ROTATING} の時使用されます） */
        private rotateSpeed: number = 1;
        /** カードの光パラメーター（{@link CardState.FLASHING} の時使用されます） */
        private lightTime: number = 0;

        /** カードの演出終了を待機する Promise */
        public promise: Promise<void>;
        private resolve: () => void;

        private beginAudio: HTMLAudioElement | null;
        private summonAudio: HTMLAudioElement | null;

        public constructor(texture: Texture | Promise<Texture>, options?: Partial<CardOptions>) {
            super();

            const opt = {
                autoplay: true,
                beginAudio: defaultBeginAudio,
                summonAudio: defaultSummonAudio,
                ...options,
            } satisfies CardOptions;

            this.beginAudio = opt.beginAudio;
            this.summonAudio = opt.summonAudio;

            const frontMaterial = new MeshPhongMaterial({ side: FrontSide });
            this.object = SceneUtils.createMultiMaterialObject(cardGeometry, [
                frontMaterial,
                cardMaterial
            ]);
            this.add(this.object);

            this.particle = getBackgroundParticle();
            this.add(this.particle);

            this.light = new SpotLight(0xFFFFFF, 4, 30, Math.PI / 4, 10, 0.5);
            this.light.position.set(0, 0, 20);
            this.add(this.light);

            const { promise, resolve } = Promise.withResolvers<void>();
            this.promise = promise;
            this.resolve = resolve;

            if (texture instanceof Promise) {
                texture.then(texture => {
                    frontMaterial.map = texture;
                    frontMaterial.needsUpdate = true;
                    if (opt.autoplay) this.setState(CardState.ROTATING);
                });
                if (opt.autoplay) this.setState(CardState.ROTATING_BEGIN);
            } else {
                if (opt.autoplay) this.setState(CardState.ROTATING);
            }
        }

        /** カードの演出の状態を取得します。 */
        public getState(): CardState {
            return this.state;
        }
        /** カードの演出の状態を設定します。 */
        public setState(state: CardState) {
            this.state = state;

            if (state === CardState.ROTATING_BEGIN) {
                this.beginAudio?.play();
            } else if (state === CardState.ROTATING) {
                this.object.rotation.y = Math.PI;
            } else if (state === CardState.FLASHING) {
                this.object.rotation.y = 0;

                // NOTE: 発光開始時、パーティクルを追加
                // for (let _ = 0; _ < 500; _++) this.add(new Particle(particleTexture, particleGeometry));
                // for (let _ = 0; _ < 500; _++) this.add(new Particle(particleTexture, particleGeometry, 0xff8800, 0.2));
                // for (let _ = 0; _ < 500; _++) this.add(new Particle(particleTexture, particleGeometry, 0xffcc00, 0.3, 1));

                this.summonAudio?.play();
            }
        }

        public render(): void {
            if (this.state === CardState.ROTATING_BEGIN || this.state === CardState.ROTATING) {
                const minSpeed = 0.01;
                const isStoppableAngle = Math.abs(this.object.rotation.y - Math.PI * 2) % (Math.PI * 2) < minSpeed;

                // NOTE: 回転する
                this.object.rotation.y += this.rotateSpeed;

                if (this.state === CardState.ROTATING) {
                    // NOTE: 減速する
                    this.rotateSpeed /= 1.03;
                    // NOTE: 停止できないアングルであれば、減速しても停止はしない
                    if (!isStoppableAngle) this.rotateSpeed = Math.max(this.rotateSpeed, minSpeed);

                    // NOTE: 減光する
                    this.light.intensity = (100 * this.rotateSpeed) ** 2;
                }

                // NOTE: パーティクルの回転と同期する
                this.particle.rotation.copy(this.object.rotation);

                if (this.rotateSpeed <= minSpeed && isStoppableAngle) {
                    // NOTE: 減速しきったら、リセットする
                    this.object.rotation.y = Math.PI * 2;
                    this.rotateSpeed = 0;
                    this.light.intensity = 0;

                    // NOTE: 次のステートへ移動
                    this.setState(CardState.FLASHING);
                }
            } else if (this.state === CardState.FLASHING) {
                // NOTE: abs(sin(t)) で光らせる
                this.lightTime += 1;
                this.light.intensity = Math.abs(Math.sin(this.lightTime / 50));
                this.object.scale.setScalar(1 + this.light.intensity / 20);
            } else if (this.state === CardState.HIDING) {
                // NOTE: 下に移動
                this.object.position.y -= 0.1 + Math.abs(this.object.position.y) / 5;

                if (this.object.position.y < -30) {
                    // NOTE: 削除
                    this.removeFromParent();
                    this.resolve();
                }
            }
        }
    }
    class Particle extends Mesh<BufferGeometry, MeshBasicMaterial> {
        private direction: Vector3 = new Vector3(Math.random() - 0.5, Math.random() - 0.5, 0);
        private speed: number = Math.random() * 0.5;
        private opacityLoss: number = Math.random() * 0.001;

        public constructor(texture: Texture, geometry: BufferGeometry, color: number = 0x4169e1, opacity: number = 0.7, z: number = -1) {
            super(geometry, new MeshBasicMaterial({
                map: texture,
                color: color,
                transparent: true,
                opacity,
                blending: AdditiveBlending
            }));

            this.position.copy({
                x: (Math.random() - 0.5) * 4.5,
                y: (Math.random() - 0.5) * 7.2,
                z,
            });
            this.scale.multiplyScalar(Math.random() * 5);
            this.material.opacity = opacity;
        }

        public override onBeforeRender() {
            this.material.opacity -= this.opacityLoss;
            if (this.material.opacity <= 0) this.removeFromParent();

            this.position.add(this.direction.clone().multiplyScalar(this.speed));
        }
    }
    class Environment {
        public renderer: WebGLRenderer = new WebGLRenderer({ alpha: true });
        public scene: Scene = new Scene();

        public constructor(container: HTMLElement) {
            this.scene.add(new AmbientLight(0xffffff, 3));

            const camera = new PerspectiveCamera(45, this.renderer.domElement.clientWidth / this.renderer.domElement.clientHeight, 0.01, 100);
            camera.position.set(0, 0, 30);

            new ResizeObserver(() => {
                const { width, height } = container.getBoundingClientRect();
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.setSize(width, height);
            }).observe(container);

            const frame = () => {
                for (const object of this.scene.children) {
                    if (object instanceof Card) object.render();
                }

                this.renderer.render(this.scene, camera);
                if (!isUnmounted.value) requestAnimationFrame(frame);
            };
            frame();
        }
    }

    await new Promise(resolve => element.addEventListener("click", resolve, { once: true }));

    // TODO: 画面を白くする
    await wait(1000);

    // NOTE: ガチャを開始
    let env = new Environment(element);
    element.appendChild(env.renderer.domElement);
    interfaceStore.visible = false;

    const items = (await (await useAuthFetch("/api/games/gacha")).json()) as GachaItem[];
    console.log("ガチャ結果", items);

    // NOTE: Begin フェーズ動画アニメーション
    if (performanceId) {
        await playMovie({
            madosoft_sr: BeginMadosoftSrMoviePath,
            madosoft_ssr: BeginMadosoftSsrMoviePath,
        }[performanceId] ?? "");
    }

    // NOTE: カードを表示
    const card = new Card(fetch("/assets/images/games/gacha/coupons/1-banner.png")
        .then(r => r.blob())
        .then(r => createImageBitmap(r, { imageOrientation: "flipY" }))
        .then(b => {
            const texture = new Texture(b);
            texture.needsUpdate = true;
            return texture;
        }),
    {
        autoplay: !performanceId,

        // NOTE: 演出によって Begin, Summon の音声を変更
        beginAudio: {
            madosoft_sr: null,
            madosoft_ssr: null,
        }[performanceId] ?? undefined,
        summonAudio: {
            madosoft_sr: new Audio(SummonMadosoftSrAudioPath),
            madosoft_ssr: new Audio(SummonMadosoftSsrAudioPath),
        }[performanceId] ?? undefined,
    });
    env.scene.add(card);

    // NOTE: クリック状態の変更
    if (performanceId) {
        card.setState(CardState.FLASHING);
    } else {
        await new Promise(resolve => env.renderer.domElement.addEventListener("click", resolve, { once: true }));
        card.setState(card.getState() + 1);

        await new Promise(resolve => env.renderer.domElement.addEventListener("click", resolve, { once: true }));
        card.setState(card.getState() + 1);
    }
    await new Promise(resolve => env.renderer.domElement.addEventListener("click", resolve, { once: true }));
    card.setState(card.getState() + 1);

    // NOTE: ガチャを終了
    // TODO: Card.onended
    env.renderer.domElement.remove();
    interfaceStore.visible = true;

    // (async function() {
    //     var coupons = (await (await fetch("/api/coupons")).json()).coupons.filter(coupon => coupon.id !== -1 && coupon.enable_gacha);
    //     var randomCouponIds = [];
    //     for (var coupon of coupons) {
    //         for (var _ = 0; _ < (6 - coupon.rank) ** 2 * coupon.rank; _++) {
    //             randomCouponIds.push(coupon.id);
    //         }
    //     }
    //     console.log("table", randomCouponIds);
    //     var storage = sessionStorage.getItem("gacha");
    //     var gachaCount = storage !== null ? parseInt(storage) : 1;
    //     var selectedIds = [];
    //     for (var _ = 0; _ < gachaCount; _++) {
    //         selectedIds.push(((array) => array[Math.floor(Math.random() * array.length)])(randomCouponIds));
    //     }
    //     console.log("selected", selectedIds);
    //     var gacha = new GachaPerformance(selectedIds);
    //     document.getElementById("myCanvas").onpointerup = e => {
    //         gacha.click();
    //     }
    //     window.onkeydown = e => {
    //         if (e.key === "Enter") gacha.click();
    //     }
    // })();
});
onUnmounted(() => isUnmounted.value = true);
</script>
