<template>
    <CommonMain>
        <h1>アカウント</h1>
        <TableStyle>
            <tbody>
                <tr>
                    <th>ID</th>
                    <td>
                        <input type="text" :placeholder="user.data?.id" :value="user.data?.id" disabled />
                        <span>ログイン時と送金時に使用する名前です。変更できません。</span>
                    </td>
                </tr>
                <tr>
                    <th>名前</th>
                    <td>
                        <input type="text" v-model="name" :placeholder="user.data?.name" />
                        <span>他のユーザーに表示される名前です。</span>
                    </td>
                </tr>
                <tr>
                    <th>パスワード</th>
                    <td><NuxtLink to="/actions/edit_account/password" class="button">変更する</NuxtLink></td>
                </tr>
            </tbody>
        </TableStyle>
        <button @click="updateAccount" class="button">更新する</button>
    </CommonMain>
</template>

<script lang="ts" setup>
const user = useUserStore();

const name = ref(user.data?.name);

async function updateAccount() {
    if (!name.value) return;

    // NOTE: ユーザー名を更新する
    const response = await useAuthFetch("/api/accounts/me", {
        method: "PUT",
        body: JSON.stringify({
            name: name.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.ok) {
        // NOTE: ユーザー情報を更新する
        await user.refresh();
        alert("アカウント情報を更新しました。");
    } else {
        // NOTE: エラー処理
        alert("アカウント情報の更新に失敗しました。");
    }
}
</script>
