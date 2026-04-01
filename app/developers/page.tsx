import {DevelopersPage} from "@/pages/DevelopersPage";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Разработчики Webcos — кто мы и как создаём сервисы",
    description:
        "Webcos — команда разработчиков, создающая современные веб-сервисы и делящаяся практическим опытом разработки. Реальные проекты, архитектура и технологии.",

    openGraph: {
        title: "Разработчики Webcos",
        description:
            "Кто мы, как создаём сервисы и почему делимся опытом разработки.",
        url: "https://webcos.ru/developers",
        type: "profile",
    },

    alternates: {
        canonical: "https://webcos.ru/developers",
    },
};

export default function Developers() {
    return (
        <DevelopersPage/>
    );
}
