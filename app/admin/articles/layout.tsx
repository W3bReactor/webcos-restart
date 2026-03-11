import type { Metadata } from "next";
import "./layout.css";
export const metadata: Metadata = {
    title: "Админ-панель / Статьи",
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
