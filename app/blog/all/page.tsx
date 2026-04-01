import {BlogAllPage} from "@/pages/BlogAllPage";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "Все статьи",
    description: "Мы создаём будущее",
};


export default async function BlogAll({searchParams}:
                                    Readonly<{
                                        searchParams: Promise<{ [key: string]: string }>
                                    }>) {
    const search = await searchParams
    return (
        <BlogAllPage searchParams={search}/>
    );
}
