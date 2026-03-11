import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Разработчики",
    description: "Наши разработчики",
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
