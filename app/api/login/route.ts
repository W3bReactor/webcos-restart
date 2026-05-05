import { cookies } from 'next/headers'
import setCookieParser from 'set-cookie-parser';


const BACKEND_URL = process.env.NEXT_PUBLIC_HOST

const isProd = process.env.NODE_ENV === 'production';
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;

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
        secure: isProd, // ОБЯЗАТЕЛЬНО
        sameSite: isProd ? 'none' : 'lax', // ОБЯЗАТЕЛЬНО
        domain: COOKIE_DOMAIN,
        path: '/',
    })


    const setCookieHeader = response.headers.get('set-cookie')
    if (setCookieHeader) {
        const parsed = setCookieParser.parse(setCookieHeader, { map: true })
        const refresh = parsed['refresh_token']?.value
        if (refresh) {
            cookieStore.set('refresh_token', refresh, {
                httpOnly: true,
                secure: isProd,
                sameSite: isProd ? 'none' : 'lax',
                domain: COOKIE_DOMAIN,
                path: '/',
            })
        }
    }


    return Response.json({ success: true })
}