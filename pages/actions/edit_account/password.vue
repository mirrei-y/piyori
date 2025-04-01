<template>
    <CommonMain>
        <h1>パスワード変更</h1>
        <table>
            <tbody>
                <tr>
                    <th>現在のパスワード</th>
                    <td>
                        <input type="password" v-model="currentPassword" />
                    </td>
                </tr>
                <tr>
                    <th>新しいパスワード</th>
                    <td>
                        <input type="password" v-model="newPassword" />
                    </td>
                </tr>
                <tr>
                    <th>新しいパスワード（確認）</th>
                    <td>
                        <input type="password" v-model="confirmPassword" />
                    </td>
                </tr>
            </tbody>
        </table>
        <button @click="updatePassword" class="button">更新する</button>
    </CommonMain>
</template>

<script lang="ts" setup>
const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");

async function updatePassword() {
    if (newPassword.value !== confirmPassword.value) {
        alert("新しいパスワードと確認用パスワードが一致しません。");
        return;
    }

    // NOTE: パスワードを更新する
    const response = await useAuthFetch("/api/accounts/me/password", {
        method: "PUT",
        body: JSON.stringify({
            currentPassword: currentPassword.value,
            newPassword: newPassword.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        alert("パスワードを更新しました。");
        currentPassword.value = "";
        newPassword.value = "";
        confirmPassword.value = "";
        await navigateTo("../edit_account");
    } else {
        // NOTE: エラー処理
        alert("パスワードの更新に失敗しました。");
    }
}
</script>
