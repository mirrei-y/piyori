<template>
    <table :class="$style.transactions">
        <thead>
            <tr>
                <th></th>
                <th>ユーザー</th>
                <th>取引アイテム</th>
                <th>取引日時</th>
                <th>備考</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="transaction in transactions">
                <th>
                    <svg v-if="transaction.sender === user.data?.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                        <path d="M5 12l14 0"></path>
                        <path d="M13 18l6 -6"></path>
                        <path d="M13 6l6 6"></path>
                    </svg>
                    <svg v-if="transaction.receiver === user.data?.id" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0030ff" stroke-linecap="round" stroke-linejoin="round" width="24" height="24" stroke-width="2">
                        <path d="M5 12l14 0"></path>
                        <path d="M5 12l6 6"></path>
                        <path d="M5 12l6 -6"></path>
                    </svg>
                </th>
                <td>{{ transaction.sender === user.data?.id ? transaction.receiver : transaction.sender }}</td>
                <td>{{ currencies[transaction.type as keyof typeof currencies].name }} <code>{{ transaction.sender === user.data?.id ? "-" : "+" }}{{ transaction.amount }}</code></td>
                <td>{{ new Date(transaction.created_at * 1000).toLocaleString() }}</td>
                <td>{{ transaction.reason }}</td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" module>
.transactions {
    thead {
        background-color: #ffffff;
    }
    tbody {
        line-height: 1;

        tr:nth-of-type(2n) {
            background-color: #ffffffa0;
        }

        tr > *:nth-child(1) {
            width: 1.5em;

            svg {
                width: 100%;
            }
        }
        tr > *:not(:nth-child(1)) {
            padding-inline: 1rem;
        }
    }

    code {
        font-size: 1em;
    }
}
</style>

<script lang="ts" setup>
import currencies from "@/data/currencies.json";
import { useAuthFetch } from "~/composables/fetch";

const props = defineProps<{
    limit?: number | string;
}>();
const user = useUserStore();
await user.ready();

const transactions = ref<any[]>();

const limit = typeof props.limit === "number" ? props.limit : parseInt(props.limit ?? "0");

// NOTE: 認証付きfetchを使用
useAuthFetch(`/api/accounts/me/transactions?limit=${limit}`)
    .then((r) => r.json())
    .then((data) => (transactions.value = data as any));
</script>
