import type { Metadata } from "next";
import './page.css'
export const metadata: Metadata = {
    title: "Все статьи",
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
