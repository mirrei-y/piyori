<template>
    <main :class="$style.main">
    </main>
</template>

<style lang="scss" module>
.main {
    flex: 1;

    overflow: hidden;

    position: relative;
    canvas {
        width: 100% !important;
        height: 100% !important;
        aspect-ratio: auto !important;

        background-color: transparent;
    }
    video {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
        margin: auto;
    }

    &::before {
        content: "";
        display: block;
        width: 100vmax;
        height: 100vmax;
        aspect-ratio: 1;
        z-index: -1;

        pointer-events: none;
        user-select: none;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%) scale(150%) rotate(0deg);

        background-image: url(/public/assets/images/games/gacha/result.webp), radial-gradient(circle, #ffc400, #ffa218 60%);
        background-size: cover;
        background-position: center;

        animation: rotate 120s infinite linear;
        @keyframes rotate {
            from { transform: translateY(-50%) translateX(-50%) scale(150%) rotate(0deg); }
            to { transform: translateY(-50%) translateX(-50%) scale(150%) rotate(360deg); }
        }
    }
}
</style>
