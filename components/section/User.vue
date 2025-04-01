<template>
    <section :class="$style.section">
        <nav :class="$style.user">
            <span><b>{{ user.data?.name }}</b> でログイン中</span>
            <NuxtLink to="/logout" class="button">ログアウト</NuxtLink>
        </nav>
    </section>
</template>

<style lang="scss" module>
.section {
    display: flex;
    flex-direction: column;

    background-color: var(--sub-background-color);

    padding-inline: 1em;
}
.user {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: min(100%, 700px);
    margin-inline: auto;

    padding-block: 0.5em;
}
</style>

<script lang="ts" setup>
const user = useUserStore();
await user.ready();
</script>
