import type { Metadata } from "next";
import "@/app/styles/globals.css";
import { Inter } from "next/font/google";
import {ThemeProvider} from "@/app/providers";
import React from "react";
import {Background, CookieBanner, ThemeAnimation, TopLoader} from "@/shared/ui";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Webcos",
  description: "Мы создаём будущее",
  icons: {
    icon: '/webcos-logo.svg'
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
