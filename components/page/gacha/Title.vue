<template>
    <main :class="$style.main">
        <header>
            <img src="/public/assets/images/decoration/sengoku-delation.webp" :class="$style.image">
            <p><small>……という名前だけ借りた</small>ただのガチャ</p>
        </header>
        <div>
            <button type="button">
                ガチャを引く
            </button>
            <div>
                残りチケット数: 10
            </div>
        </div>
        <footer>
            <p>本ページはガチャのみの実装となります。</p>
            <p>要望があればゲームも作っちゃう……かも！？</p>
        </footer>
    </main>
</template>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2em;

    text-align: center;

    background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="32" height="64" viewBox="0 0 32 64"><path d="M 16,0 32,32 16,64 0,32 Z" style="fill:none;stroke:%2345120b40;stroke-width:1px" /></svg>');
    background-position: center;

    &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;

        pointer-events: none;

        width: 100%;

        max-width: 30em;
        margin-inline: auto;
    }

    header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;

        color: #45120b;
        font-size: 1.5em;
        font-weight: bold;

        small {
            font-weight: normal;
            font-size: 1rem;
            opacity: 0.6;
        }
        img {
            width: auto;
            height: auto;
            max-width: 50vw;
            max-height: 20vh;
        }
    }
    button {
        font-size: 1.25em;
    }
    footer {
        text-align: center;

        font-size: 0.8em;
        opaicty: 0.8;
    }
}
</style>
