export async function clientFetch(
    path: string,
    options: RequestInit = {}
) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}${path}`, {
        ...options,
        credentials: 'include',
    })
    if (res.status === 401) {
        await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/refresh`, { method: "POST", credentials: "include" });

        await new Promise(r => setTimeout(r, 10))

        return fetch(`${process.env.NEXT_PUBLIC_HOST}${path}`, {
            ...options,
            credentials: 'include',
        });
    }

    return res;

}

