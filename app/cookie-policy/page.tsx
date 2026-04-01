import {CookiePolicyPage} from "@/pages";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Политика использования cookie-файлов",
    description: "Политика использования cookie-файлов",
};


export default function CookiePolicy() {
    return (
        <CookiePolicyPage/>
    );
}
