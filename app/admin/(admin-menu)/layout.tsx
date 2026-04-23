import "@/app/styles/globals.css";
import { Inter } from "next/font/google";
import {ThemeProvider} from "@/app/providers";
import React from "react";
import {Background, CookieBanner, ThemeAnimation, TopLoader} from "@/shared/ui";
import {notFound} from "next/navigation";
import {cookies} from "next/headers";

const inter = Inter({ subsets: ["latin"] });



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const token = (await cookies()).get("access_token")

    if (!token) {
        notFound();
    }

  return (
    //  suppressHydrationWarning - нужен для next-themes (Он не блокирует другие уровни)
    <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
              <TopLoader/>
              <ThemeProvider>
                  <ThemeAnimation/>
                  <Background/>
                  <CookieBanner />
                  {children}
              </ThemeProvider>
          </body>
    </html>
  );
}
