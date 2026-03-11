import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Админ-панель / Создание баннера для статьи",
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
