<template>
    <main :class="$style.main">
        <section :class="$style.panel">
            <img src="/public/assets/images/logo.svg" width="102" height="29" alt="Piyori" />
            <div>
                <span :class="$style.name">{{ user.data?.name }} さんのポイント</span>
                <span :class="$style.point">
                    <span :class="$style.minus" v-if="(user.data?.currencies.main ?? 0) < 0">-</span>
                    {{ Math.abs(user.data?.currencies.main ?? 0) }}
                    <small>pt</small>
                </span>
            </div>
        </section>
        <SectionEvent v-for="event in activeEvents" :event="event" />
        <SectionUser />
        <SectionNavigation />
        <section :class="$style.transactions">
            <h2>取引履歴</h2>
            <Transactions limit="10" />
            <p>さらに表示したい場合は、<NuxtLink to="/actions/transactions">こちら</NuxtLink>を参照してください。</p>
        </section>
    </main>
</template>

<style lang="scss" module>
.main {
    display: flex;
    flex-direction: column;
}
.panel {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2em;

    padding-block: 4em;

    width: 100%;

    position: relative;
    overflow: hidden;
    &::before {
        content: "";
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: -1;

        background: url(/public/assets/images/background/01.webp) center;
        filter: blur(2px) saturate(80%) opacity(50%);
    }

    & > img {
        width: auto;
        height: 4em;
        filter: drop-shadow(0px 0px 6px #ffffff);
    }
    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5em;

        background-color: var(--background-color);

        padding: 2rem;
        border-radius: 100%;
        border: 0.5rem solid var(--sub-background-color);

        aspect-ratio: 1;
    }

    .name {
        opacity: 0.5;
    }
    .point {
        display: flex;
        align-items: flex-end;

        line-height: 1;
        font-family: monospace;
        font-weight: bold;
        font-size: 3.5em;

        .minus {
            opacity: 0.5;
        }
        small {
            font-size: 0.5em;
            margin-left: 0.25rem;
        }
    }
}
.transactions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;

    padding-block: 2em;
}

.events {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5em;

    padding-block: 2em;
}
</style>

<script lang="ts" setup>
import { SectionNavigation } from "#components";
import { ref, onMounted } from "vue";
import type { IEvent } from "~/types/event";

const user = useUserStore();
await user.refresh();

const activeEvents = ref<IEvent[]>([]);

onMounted(async () => {
    activeEvents.value = await $fetch("/api/events");
});
</script>
