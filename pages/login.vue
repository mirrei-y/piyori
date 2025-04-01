<template>
    <main :class="$style.main">
        <form @submit.prevent="login">
            <img src="/public/assets/images/logo.svg" alt="" />
            <label>
                <span>ID</span>
                <input type="text" v-model="id" required />
            </label>
            <label>
                <span>パスワード</span>
                <input type="password" v-model="password" required />
            </label>
            <p :class="$style.error" v-if="isFailed">エラー: IDもしくはパスワードが違います。</p>
            <button type="submit" :disabled="isDisabled">ログイン</button>
        </form>
    </main>
</template>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding-block: 2em;

    flex: 1;

    background: url(/public/assets/images/background/02.webp);
    animation: background-move 20s infinite linear;

    form {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 1em;

        width: fit-content;
        margin-inline: auto;

        padding: 4em 3em;
        background-color: var(--background-color);
        border-radius: 1em;
        box-shadow: 0px 0px 1em 0px #80808040;

        img {
            margin-bottom: 1em;
        }
        label {
            display: flex;
            flex-direction: column;

            span {
                font-size: 1em;
            }
        }
        input, button {
            font-size: 1em;

            width: 20rem;

            padding: 0.5em 0.75em;
        }
        button {
            margin-top: 2em;
        }
    }

    @keyframes background-move {
        from {
            background-position: 0px 0px;
        }
        to {
            background-position: 376px 376px;
        }
    }
}
.error {
    color: #e00000;
}
</style>

<script lang="ts" setup>
const id = ref<string>();
const password = ref<string>();
const isFailed = ref<boolean>();
const isDisabled = ref<boolean>();
const user = useUserStore();

async function login() {
    if (isDisabled.value) return;
    isDisabled.value = true;

    const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id.value,
            password: password.value,
        })
    });

    if (response.ok) {
        await user.setToken(((await response.json()) as any).token);
        location.href = "/login";
    } else {
        isFailed.value = true;
        isDisabled.value = false;
        id.value = "";
        password.value = "";
    }
}
</script>
