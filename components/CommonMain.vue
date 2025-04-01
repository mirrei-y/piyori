<template>
    <main :class="$style.main">
        <slot />
    </main>
</template>

<style lang="scss" module>
.main {
    width: min(900px, calc(100% - 2em * 2));
    margin-inline: auto;
    margin-block: 3em;

    h1 {
        margin-bottom: 0.5em;
    }
}
</style>
