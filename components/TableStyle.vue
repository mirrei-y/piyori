<template>
    <table :class="$style.table">
        <slot />
    </table>
</template>

<style lang="scss" module>
.table {
    padding-block: 0.5em;

    a:global(.button) {
        width: fit-content;
    }
    th:nth-child(1) {
        padding-inline: 2em;
        border-right: 3px solid var(--border-color);

        background-color: #ffffff80;

        font-weight: bold;
    }
    td:nth-child(2) {
        display: flex;
        flex-direction: column;
        gap: 0.25em;
        padding: 1em;

        background-color: var(--sub-background-color);
    }
    input:disabled {
        background-color: #ffffff80;
    }
}
</style>
