import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

export async function POST() {
    const cookieStore = await cookies();

    const backendResponse = await fetch(
        "http://localhost:8080/api/v1/auth/refresh",
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
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: c.maxAge ?? 10
        });
    }



    return NextResponse.json({
        success: true
    });
}