export async function clientFetch(
    path: string,
    options: RequestInit = {}
) {
    return fetch(`${process.env.NEXT_PUBLIC_HOST}${path}`, {
        ...options,
        credentials: 'include',
    })
}