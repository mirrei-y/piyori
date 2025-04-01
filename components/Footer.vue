<template>
    <footer :class="$style.footer" v-show="useInterfaceStore().visible">
        <div :class="$style.container" aria-hidden="true">
            <img src="/public/assets/images/decoration/hiyorin.webp" width="250" height="127" loading="lazy" decoding="async" alt="" />
            <p>{{ (a => a[Math.floor(Math.random() * a.length)])([
                        "「私もお兄がとぅきー！」",
                        "「うぇえい？」",
                        "「てりたまー！」",
                        "「プリンですって！？」",
                        "「チャーハン！」",
                        "「あるよ☆」",
                        "「きゃ（↑）くほん」",
                        "「AREッ！？」",
                    ]) }}</p>
        </div>
        <nav :class="$style.navigation">
            <NuxtLink to="/rules" target="_blank">ご利用規定</NuxtLink>
        </nav>
        <p :class="$style.copyright">&copy; 2025 しろいろファンクラブ</p>
    </footer>
</template>

<style lang="scss" module>
.footer {
    display: flex;
    flex-direction: column;

    margin-top: auto;

    .container {
        display: flex;
        align-items: center;
        justify-content: center;

        text-align: center;

        background-color: var(--sub-background-color);
        opacity: 0.5;

        img {
            width: auto;
            height: 3em;
        }
    }
    .navigation {
        display: flex;
        justify-content: center;
        padding-block: 1em;

        background-color: var(--sub-background-color);
    }
    .copyright {
        background-color: var(--sub-background-color);

        padding-block: 0.5rem;
        border-top: 1px solid var(--border-color);

        line-height: 1;
        text-align: center;

        font-family: system-ui;

        small {
            font-weight: bold;
            opacity: 0.5;
        }
    }
}
</style>
