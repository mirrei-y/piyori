<template>
    <CommonMain :class="$style.main">
        <h1>取引履歴</h1>
        <p>履歴は最新の1000件のみ表示されます。</p>
        <Transactions limit="1000" />
    </CommonMain>
</template>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    gap: 1em;
}
</style>
