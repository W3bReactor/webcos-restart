import {BlogPage} from "@/pages/BlogPage";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Блог о разработке — практический опыт, архитектура и технологии",
    description:
        "Блог Webcos о разработке: реальные кейсы, архитектура проектов, Next.js, Java backend и практические решения без лишней теории.",

    openGraph: {
        title: "Блог Webcos — разработка и технологии",
        description:
            "Практика разработки: от frontend до backend. Реальные решения и опыт.",
        url: "https://webcos.ru/blog",
        type: "website",
    },

    alternates: {
        canonical: "https://webcos.ru/blog",
    },
};

export default function Blog() {
    return (
        <BlogPage/>
    );
}
