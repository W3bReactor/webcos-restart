import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

const BACKEND_URL = process.env.NEXT_PUBLIC_HOST

const isProd = process.env.NODE_ENV === 'production';
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;


export async function POST() {
    const cookieStore = await cookies();

    const backendResponse = await fetch(
        `${BACKEND_URL}/api/v1/auth/refresh`,
        {
            method: "POST",
            headers: {
                Cookie: cookieStore.toString()
            },
            cache: "no-store"
        }
    );

    if (!backendResponse.ok) {
        return NextResponse.json(
            {},
            { status: backendResponse.status }
        );
    }

    const setCookies =
        backendResponse.headers
            .getSetCookie();

    const parsed = setCookieParser.parse(setCookies, { map: false });

    for (const c of parsed) {
        (await cookies()).set(c.name, c.value, {
            httpOnly: true,
            path: c.path ?? "/",
            secure: isProd, // ОБЯЗАТЕЛЬНО
            sameSite: isProd ? 'none' : 'lax', // ОБЯЗАТЕЛЬНО
            domain: COOKIE_DOMAIN,
            maxAge: c.maxAge ?? 10
        });
    }



    return NextResponse.json({
        success: true
    });
}