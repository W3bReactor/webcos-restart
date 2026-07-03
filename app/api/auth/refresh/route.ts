import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const BACKEND_URL = process.env.NEXT_PUBLIC_HOST;

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

    const response = NextResponse.json({
        success: true
    });

    backendResponse.headers
        .getSetCookie()
        .forEach(cookie => {
            response.headers.append(
                "Set-Cookie",
                cookie
            );
        });

    return response;
}