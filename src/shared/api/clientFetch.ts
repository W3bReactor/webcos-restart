export async function clientFetch(
    path: string,
    options: RequestInit = {}
) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}${path}`, {
        ...options,
        credentials: 'include',
    })
    if (res.status === 401) {
        await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });

        return fetch(`${process.env.NEXT_PUBLIC_HOST}${path}`, {
            ...options,
            credentials: 'include',
        });
    }

    return res;

}

