<template>
    <header :class="$style.header" v-show="useInterfaceStore().visible">
        <NuxtLink to="/actions/home" :class="$style.logo">
            <img src="/public/assets/images/logo.svg" width="102" height="29" alt="Piyori" />
        </NuxtLink>
        <nav>
            <NuxtLink to="/actions/home" class="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
                </svg>
                <span>ホーム</span>
            </NuxtLink>
            <NuxtLink to="/actions/edit_account" class="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                </svg>
                <span>アカウント</span>
            </NuxtLink>
            <NuxtLink to="/logout" class="button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                    <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                    <path d="M9 12h12l-3 -3"></path>
                    <path d="M18 15l3 -3"></path>
                </svg>
                <span>ログアウト</span>
            </NuxtLink>
        </nav>
    </header>
</template>

<style lang="scss" module>
.header {
    position: sticky;
    top: 0px;

    display: flex;
    justify-content: space-between;
    gap: 1.5em;
    padding: 0.5em 1.5em;

    background-color: var(--sub-background-color);
    border-bottom: 3px dotted var(--border-color);

    z-index: 1;

    nav {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1em;

        @media (max-width: 40em) {
            gap: 0.5em;

            a {
                padding-inline: 0.5em;

                span {
                    display: none;
                }
            }
        }
    }
}
.logo {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    gap: 0.75em;

    line-height: 1;
    color: currentColor;
    text-decoration: none;

    span {
        opacity: 0.8;
    }
    img {
        height: 2em;
    }
}
</style>
