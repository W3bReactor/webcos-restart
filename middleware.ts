import { NextRequest, NextResponse } from "next/server";

const excludedPaths = ['/admin/login'];


export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    if (excludedPaths.includes(pathname)) {
        return
    }
        const access =
        req.cookies.get("access_token");

    if (access) {
        return NextResponse.next();
    }

    const refresh =
        req.cookies.get("refresh_token");

    if (!refresh) {
        return NextResponse.rewrite(
            new URL("/404", req.url)
        );
    }

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/refresh`,
        {
            method: "POST",
            headers: {
                Cookie: req.headers.get("cookie") ?? ""
            }
        }
    );

    if (!response.ok) {
        return NextResponse.rewrite(
            new URL("/404", req.url)
        );
    }

    const nextResponse =
        NextResponse.next();



    const setCookies = response.headers.getSetCookie?.() ?? [];

    for (const cookie of setCookies) {
        nextResponse.headers.append("set-cookie", cookie);
    }

    return nextResponse;}

export const config = {
    matcher: ["/admin/:path*"]
};
