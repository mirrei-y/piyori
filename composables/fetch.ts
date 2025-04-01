import { useUserStore } from "@/stores/user";

export const useAuthFetch = async (input: string, init?: RequestInit) => {
    return fetch(input, {
        ...init,
        headers: {
            "Authorization": `Bearer ${useUserStore().getToken()}`,
            ...init?.headers,
        },
    });
};
