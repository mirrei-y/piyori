<template>
    <section :class="$style.section" :style="`--color:${event.theme_color}`">
        <div>
            <img :src="`/assets/images/events/${event.id}.svg`" />
            <div>
                <h2>「<b>{{ event.name }}</b>」開催中！</h2>
                <p><small>{{ event.summary }}</small></p>
            </div>
        </div>
    </section>
</template>

<style lang="scss" module>
.section {
    display: flex;
    flex-direction: column;

    padding: 1em 1.5rem;

    position: relative;
    &::before {
        content: "";
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background-color: var(--color);
        opacity: 0.2;
        z-index: -1;
    }

    & > div {
        display: flex;
        align-items: center;
        gap: 1em;

        width: min(100%, 700px);
        margin-inline: auto;

        padding-block: 0.5em;

        & > img {
            width: 3em;
        }
    }

    h2 {
        font-size: 1em;
        font-weight: normal;
    }
}
</style>

<script lang="ts" setup>
import type { IEvent } from "~/types/event";

defineProps<{
    event: IEvent;
}>();
</script>
