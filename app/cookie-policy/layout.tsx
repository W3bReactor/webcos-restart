import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Политика использования cookie-файлов",
    description: "Политика использования cookie-файлов",
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
