<template>
    <section :class="$style.section">
        <nav :class="$style.navigation">
            <NuxtLink to="/actions/edit_account">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                </svg>
                アカウント
            </NuxtLink>

            <NuxtLink to="/actions/transactions">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M12 19h-6a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v4.5"></path>
                    <path d="M3 10h18"></path>
                    <path d="M16 19h6"></path>
                    <path d="M19 16l3 3l-3 3"></path>
                    <path d="M7.005 15h.005"></path>
                    <path d="M11 15h2"></path>
                </svg>
                取引履歴
            </NuxtLink>

            <NuxtLink to="/actions/remittance">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M5 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M19 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M19 8v5a5 5 0 0 1 -5 5h-3l3 -3m0 6l-3 -3"></path>
                    <path d="M5 16v-5a5 5 0 0 1 5 -5h3l-3 -3m0 6l3 -3"></path>
                </svg>
                送金
            </NuxtLink>

            <NuxtLink to="/actions/games/gacha">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0"></path>
                    <path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889"></path>
                    <path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889"></path>
                </svg>
                ガチャ
            </NuxtLink>

            <NuxtLink to="/" inert>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M12 5h3.5a5 5 0 0 1 0 10h-5.5l-4.015 4.227a2.3 2.3 0 0 1 -3.923 -2.035l1.634 -8.173a5 5 0 0 1 4.904 -4.019h3.4z"></path>
                    <path d="M14 15l4.07 4.284a2.3 2.3 0 0 0 3.925 -2.023l-1.6 -8.232"></path>
                    <path d="M8 9v2"></path>
                    <path d="M7 10h2"></path>
                    <path d="M14 10h2"></path>
                </svg>
                ゲーム
            </NuxtLink>

            <NuxtLink to="/" inert>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M3 21l18 0"></path>
                    <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"></path>
                    <path d="M5 21l0 -10.15"></path>
                    <path d="M19 21l0 -10.15"></path>
                    <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>
                </svg>
                マーケット
            </NuxtLink>

            <NuxtLink to="/actions/kisekae">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"></path>
                </svg>
                着せ替え
            </NuxtLink>
        </nav>
    </section>
</template>

<style lang="scss" module>
.section {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.navigation {
    display: grid;
    justify-items: center;
    grid-template-columns: 9em 9em 9em 9em 9em;

    max-width: 800px;
    margin-block: 2em;

    @media (max-width: calc(9em * 5 + 1em)) {
        grid-template-columns: 9em 9em 9em 9em;
    }
    @media (max-width: calc(9em * 4 + 1em)) {
        grid-template-columns: 9em 9em 9em;
    }
    @media (max-width: calc(9em * 3 + 1em)) {
        grid-template-columns: 9em 9em;
    }
    @media (max-width: calc(9em * 2 + 1em)) {
        grid-template-columns: 9em;
    }
    a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        width: 8em;
        height: 8em;
        margin-block: 0.25em;

        border-radius: 0.5em;
        border: 3px solid var(--border-color);
        box-shadow: 0px 0px 1em -0.5em currentColor;

        background-color: #ffffff;
        text-decoration: none;

        &[inert] {
            cursor: not-allowed;
            opacity: 0.7;

            filter: grayscale(100%) contrast(80%) brightness(120%);
        }

        svg {
            width: 40%;
            height: 40%;
        }
    }
}
</style>
