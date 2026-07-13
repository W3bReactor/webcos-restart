// import 'ckeditor5/ckeditor5-content.css';
import './article-content.css';


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
