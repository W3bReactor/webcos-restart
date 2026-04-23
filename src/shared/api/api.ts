import {serverFetch} from "@/shared/api/serverFetch";
import {clientFetch} from "@/shared/api/clientFetch";

export async function apiFetch(path: string, options?: RequestInit) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 8000); // 8 секунд — норм для прода

    try {
        const fetchOptions: RequestInit = {
            ...options,
            signal: controller.signal,
        };

        if (typeof window === 'undefined') {
            return await serverFetch(path, fetchOptions);
        }

        return await clientFetch(path, fetchOptions);

    } finally {
        clearTimeout(timeout);
    }
}
