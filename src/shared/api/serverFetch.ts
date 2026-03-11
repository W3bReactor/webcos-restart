export async function serverFetch(
    path: string,
    options: RequestInit = {}
) {
    return fetch(`${process.env.NEXT_PUBLIC_HOST}${path}`, {
        ...options,
    })
}