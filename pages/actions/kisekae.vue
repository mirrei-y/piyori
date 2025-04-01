<template>
    <CommonMain :class="$style.main">
        <h1>着せ替え</h1>
        <TableStyle>
            <tbody>
                <tr>
                    <th>色</th>
                    <td>
                        <label>
                            <input type="range" id="hue" min="0" max="360" v-model="hue" />
                            <span>{{ hue < 0 ? "デフォルト" : `${hue}°` }}</span>
                            <button type="button" @click="hue = -1">デフォルトに戻す</button>
                        </label>
                    </td>
                </tr>
            </tbody>
        </TableStyle>
    </CommonMain>
</template>

<script lang="ts" setup>
import { applyHue } from "~/composables/hue";

const hue = ref(0);

onMounted(() => {
    hue.value = parseInt(localStorage.getItem("hue") ?? "-1");
});

watch(hue, (newHue) => {
    if (newHue < 0) {
        localStorage.removeItem("hue");
    } else {
        localStorage.setItem("hue", newHue.toString());
    }
    applyHue();
});
</script>

<style lang="scss" module>
.main {
    table {
        width: 100%;
    }
    input[type=range] {
        display: block;
        appearance: none;

        padding: 0px;
        margin: 0px;
        border: none;

        background: linear-gradient(to right,
            hsl(0turn, 100%, 50%),
            hsl(0.05turn, 100%, 50%),
            hsl(0.1turn, 100%, 50%),
            hsl(0.15turn, 100%, 50%),
            hsl(0.2turn, 100%, 50%),
            hsl(0.25turn, 100%, 50%),
            hsl(0.3turn, 100%, 50%),
            hsl(0.35turn, 100%, 50%),
            hsl(0.4turn, 100%, 50%),
            hsl(0.45turn, 100%, 50%),
            hsl(0.5turn, 100%, 50%),
            hsl(0.55turn, 100%, 50%),
            hsl(0.6turn, 100%, 50%),
            hsl(0.65turn, 100%, 50%),
            hsl(0.7turn, 100%, 50%),
            hsl(0.75turn, 100%, 50%),
            hsl(0.8turn, 100%, 50%),
            hsl(0.85turn, 100%, 50%),
            hsl(0.9turn, 100%, 50%),
            hsl(0.95turn, 100%, 50%),
            hsl(1turn, 100%, 50%)
        );

        width: 100%;
        height: 1em;
        border-radius: 0px;
        border-top-left-radius: 0.5rem;
        border-top-right-radius: 0.5rem;

        cursor: pointer;

        &::-webkit-slider-thumb {
            appearance: none;
            width: 0.5em;
            height: 1.5em;
            background: #fff;
            border: 1px solid #000;
            border-radius: 0.25em;
        }

        & + span {
            width: 10em;
            display: inline-block;

            font-size: 1em;
            font-weight: bold;
            line-height: 1;
            opacity: 0.5;

            pointer-events: none;
            user-select: none;
        }
        & + span + button {
            float: right;
            font-size: 0.8em;
            padding: 0.5em;

            border-top: none;
            border-radius: 0px;
            border-bottom-left-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
        }
    }
}
</style>
