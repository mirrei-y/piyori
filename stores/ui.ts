import { defineStore } from "pinia"

export const useInterfaceStore = defineStore("interface", () => {
    const visible = ref<boolean>(true);

    return {
        visible
    };
});
