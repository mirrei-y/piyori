<template>
    <CommonMain>
        <h1>送金</h1>
        <TableStyle>
            <tbody>
                <tr>
                    <th>送金先</th>
                    <td>
                        <input type="text" id="recipient" v-model="recipient">
                    </td>
                </tr>
                <tr>
                    <th>送金額</th>
                    <td>
                        <input type="number" id="amount" v-model="amount">
                    </td>
                </tr>
                <tr>
                    <th>通貨</th>
                    <td>
                        <select id="currency" v-model="currency">
                            <option v-for="(currencyName, currencyId) in currencies" :key="currencyId" :value="currencyId">{{ currencyName.name }}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>理由</th>
                    <td>
                        <input type="text" id="reason" v-model="reason">
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td>
                        <button @click="remit">送金</button>
                        <p v-if="message">{{ message }}</p>
                    </td>
                </tr>
            </tbody>
        </TableStyle>
    </CommonMain>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthFetch } from "~/composables/fetch";
import currencies from "@/data/currencies.json";

const recipient = ref("");
const amount = ref(0);
const currency = ref("main");
const reason = ref("");
const message = ref("");

const remit = async () => {
    try {
        const response = await useAuthFetch("/api/accounts/me/transactions", {
            method: "POST",
            body: JSON.stringify({
                recipient: recipient.value,
                amount: amount.value,
                currency: currency.value,
                reason: reason.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status === 200) {
            message.value = "送金が完了しました。";
            recipient.value = "";
            amount.value = 0;
            reason.value = "";
        } else if (response.status === 400) {
            message.value = "送金に失敗しました。送金先、および送金額を確認してください。";
        } else if (response.status === 500) {
            message.value = "システムエラーが発生しました。管理者に問い合わせてください。";
        }
    } catch (error: any) {
        message.value = "送金に失敗しました: " + error.message;
    }
};
</script>
