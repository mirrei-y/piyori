<template>
    <CommonMain :class="$style.main">
        <h1><img src="/public/assets/images/logo.svg" width="102" height="29" alt="Piyori" /></h1>
        <h2>みんなを平等につなぐ<br>次世代ポイントシステム</h2>
        <a :class="$style.button" href="/login">ログイン</a>
        <p>※本サービスは限定されたユーザーのみ利用できます。<br>　ユーザーの新規登録は承っておりませんのでご了承ください。</p>
    </CommonMain>
</template>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;

    flex: 1;

    h1 img {
        width: auto;
        height: 3em;
    }
    h2 {
        font-size: 3em;

        @media (max-width: 40rem) {
            font-size: 2em;
        }
    }

    &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;

        background: url(/public/assets/images/background/01.webp) center;
        filter: blur(2px) saturate(50%) brightness(110%) opacity(30%);

        z-index: -1;
    }
}
.button {
    display: flex;

    width: fit-content;
    padding: 1em 2em;

    background-color: var(--sub-background-color);
    border-radius: 0.5em;
    box-shadow: 0px 0px 1em currentColor;

    font-size: 1.5em;
    line-height: 1;
    text-decoration: none;
    text-align: center;
}
</style>
