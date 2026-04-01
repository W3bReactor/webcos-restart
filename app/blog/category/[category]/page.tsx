import {BlogAllPage, getCategoryApi} from "@/pages/BlogAllPage";
import {Metadata} from "next";


export async function generateMetadata({params}:
                                       Readonly<{
                                           params: Promise<{ category: string }>
                                       }>): Promise<Metadata> {

    const res = await getCategoryApi((await params).category);

    if (!res.success) {
        return {
            title: "Категория не найдена | Webcos",
            robots: { index: false }
        };
    }

    const category = res.data;

    return {
        title: `${category.title} — статьи и гайды | Webcos`,
        description: category.description,
        keywords: [
            category.title,
            `${category.title} статьи`,
            `${category.title} гайды`,
            `${category.title} обучение`
        ],

        alternates: {
            canonical: `https://webcos.ru/blog/category/${category.id}-${category.slug}`
        },

        openGraph: {
            title: `${category.title} — Webcos`,
            description: category.description,
            url: `https://webcos.ru/blog/category/${category.id}-${category.slug}`,
            siteName: "Webcos",
            images: [category.icon],
            type: "website"
        }
    };
}


export default async function BlogCategory({searchParams, params}:
                                    Readonly<{
                                        params: Promise<{ category: string }>
                                        searchParams: Promise<{ [key: string]: string }>
                                    }>) {
    const search = await searchParams
    const {category} = await params;
    return (
        <BlogAllPage categoryId={category} searchParams={search}/>
    );
}
