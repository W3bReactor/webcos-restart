import { cookies } from 'next/headers'
import setCookieParser from 'set-cookie-parser';


const BACKEND_URL = process.env.NEXT_PUBLIC_HOST

export async function POST(req: Request) {
    const body = await req.json()

    const response = await fetch(
        `${BACKEND_URL}/api/v1/auth/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            credentials: 'include'
        }
    )
    if (!response.ok) {
        return new Response('Unauthorized', { status: 401 })
    }

    const data = await response.json()

    const cookieStore = await cookies()

    cookieStore.set('access_token', data.accessToken, {
        httpOnly: true,
        secure: true, // ОБЯЗАТЕЛЬНО
        sameSite: 'none', // ОБЯЗАТЕЛЬНО
        domain: '.webcos.ru',
        path: '/',
    })


    const setCookieHeader = response.headers.get('set-cookie')
    if (setCookieHeader) {
        const parsed = setCookieParser.parse(setCookieHeader, { map: true })
        const refresh = parsed['refresh_token']?.value
        if (refresh) {
            cookieStore.set('refresh_token', refresh, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                domain: '.webcos.ru',
                path: '/',
            })
        }
    }


    return Response.json({ success: true })
}