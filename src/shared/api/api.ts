import {serverFetch} from "@/shared/api/serverFetch";
import {clientFetch} from "@/shared/api/clientFetch";

export async function apiFetch(path: string, options?: RequestInit) {
    if (typeof window === 'undefined') {
        return serverFetch(path, options)
    }
    return clientFetch(path, options)
}


