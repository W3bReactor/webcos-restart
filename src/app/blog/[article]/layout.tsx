import type { Metadata } from "next";
import './new-editor.css';

export const metadata: Metadata = {
    title: "Статья",
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
