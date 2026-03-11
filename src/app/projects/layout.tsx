import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Проекты",
    description: "Наши проекты и сервисы",
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
