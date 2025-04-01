<template>
    <ClientOnly>
        <NuxtPage />
    </ClientOnly>
</template>

<style lang="scss">
:root {
    font-family: 'Noto Sans JP', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
    font-weight: 400;

    color-scheme: light dark;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    --background-color: #fffaee;
    --foreground-color: #743f14;
    --sub-background-color: #fff09e;
    --border-color: #e0bd2f;

    background-color: var(--background-color);
    color: var(--foreground-color);
}
#__nuxt {
    display: flex;
    flex-direction: column;
}
html, body, body > #__nuxt {
    margin: 0;
    min-height: 100vh;
}
img {
    pointer-events: none;
    user-select: none;
}
a {
    color: currentColor;

    font-weight: 500;

    &:hover {
        filter: saturate(80%) brightness(110%);
    }
}
a.button {
    display: flex;
    align-items: center;
    gap: 0.25em;

    padding: 0.5rem 1rem;

    line-height: 1;
    text-decoration: none;
    background-color: #ffffff80;
}
input, button {
    border-radius: 8px;
    border: 1px solid currentColor;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-family: inherit;

    background-color: #ffffff;
    color: currentColor;

    &:disabled {
        border: none;
    }
}
button {
    font-weight: 500;
    cursor: pointer;
    transition: border-color 0.25s;

    &:hover {
        border-color: #83522b;
    }
    &:focus, &:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
}
h1, h2, h3, h4, h5, h6, p {
    margin: 0px;
}
</style>

<script lang="ts" setup>
import { onMounted } from "vue";
import { applyHue } from "~/composables/hue";

const user = useUserStore();

onMounted(() => {
    applyHue();
});
</script>
