import type { Metadata } from "next";
import "@/app/styles/globals.css";

export const metadata: Metadata = {
    title: "Админ-панель / История",
    description: "Мы создаём будущее",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
