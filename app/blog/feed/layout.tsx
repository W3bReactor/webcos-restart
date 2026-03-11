import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Статьи / Моя лента",
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
