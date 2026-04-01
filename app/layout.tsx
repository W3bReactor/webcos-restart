import type {Metadata} from "next";
import "@/app/styles/globals.css";
import {Inter} from "next/font/google";
import {ThemeProvider} from "@/app/providers";
import React from "react";
import {Background, CookieBanner, ThemeAnimation, TopLoader} from "@/shared/ui";

const inter = Inter({subsets: ["latin"]});


export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://webcos.ru"),

    title: {
        default: "Webcos — сервисы и технологии будущего",
        template: "%s | Webcos",
    },

    description:
        "Webcos — платформа, где создаются современные веб-сервисы и публикуются практические материалы по разработке. Делимся опытом, разбираем технологии и показываем реальные решения.",

    keywords: [
        "webcos",
        "разработка",
        "frontend",
        "backend",
        "next js",
        "java backend",
        "web разработка",
        "it блог"
    ],

    openGraph: {
        type: "website",
        locale: "ru_RU",
        url: process.env.NEXT_PUBLIC_APP_URL,
        siteName: "Webcos",
        images: [
            {
                url: "/og-cover.png",
                width: 1200,
                height: 630,
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        creator: "@webcos",
    },

    robots: {
        index: true,
        follow: true,
    },

    icons: {
        icon: "/webcos-logo.svg",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        //  suppressHydrationWarning - нужен для next-themes (Он не блокирует другие уровни)
        <html lang="ru" suppressHydrationWarning>
        <body className={inter.className}>
        <TopLoader/>
        <ThemeProvider>
            <ThemeAnimation/>
            <Background/>
            <CookieBanner/>
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
