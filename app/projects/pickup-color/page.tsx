import {Metadata} from "next";
import {PickupColorPage} from "@/pages";

export const metadata: Metadata = {
    title: "Проекты Webcos — современные веб-сервисы и инструменты",
    description:
        "Проекты Webcos — это реальные веб-сервисы и инструменты, созданные для решения практических задач. Быстро, удобно и без лишнего.",

    openGraph: {
        title: "Проекты Webcos",
        description:
            "Сервисы и инструменты, которые упрощают работу и решают реальные задачи.",
        url: "https://webcos.ru/projects/pickup-color",
        type: "website",
    },

    alternates: {
        canonical: "https://webcos.ru/projects/pickup-color",
    },
};

export default function PickupColor() {
    return (
        <PickupColorPage/>
    );
}
