import { defineStore } from "pinia"
import type { IUser } from "../types/user";

export const useUserStore = defineStore("user", () => {
    const data = ref<IUser | null>(null);

    const readyPromise = refresh();

    async function refresh() {
        const route = useRoute();
        const token = localStorage.getItem("token");

        if (token) {
            const response = await fetch("/api/accounts/me", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!response.ok) {
                localStorage.removeItem("token");
                await navigateTo("/login");
                return;
            }

            data.value = await response.json();
        }

        if (route.path !== "/login" && route.path !== "/" && data.value === null) {
            await navigateTo("/login");
            useRouter().beforeEach(() => false);
        }
        if (route.path === "/login" && data.value !== null) {
            await navigateTo("/actions/home");
        }
    }
    async function ready() {
        await readyPromise;
    }
    function getToken(): string | null {
        return localStorage.getItem("token");
    }
    async function setToken(token: string | null) {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
            await navigateTo("/logout");
        }

        await refresh();
    }

    return {
        data,
        ready,
        refresh,
        getToken,
        setToken,
    };
});
