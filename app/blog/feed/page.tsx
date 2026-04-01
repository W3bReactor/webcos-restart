import {BlogFeedPage} from "@/pages/BlogFeedPage";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "Статьи / Моя лента",
    description: "Лента рекомендованных статей для пользователя",
};


export default function BlogFeed() {
    return (
        <BlogFeedPage/>
    );
}
