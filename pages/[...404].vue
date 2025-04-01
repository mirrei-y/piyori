<template>
    <main :class="$style.main">
        <h1>404 Not Found</h1>
        <p>ページが見つかりませんでした。</p>
    </main>
</template>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;

    margin: 2em;
}
</style>
