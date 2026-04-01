import {ArticlePage} from "@/pages/ArticlePage";
import {Metadata} from "next";
import {getArticleApi} from "@/widgets/Article";
import React from "react";
import {getCategoryApi} from "@/pages/BlogAllPage";




export async function generateMetadata({params}:
                                       Readonly<{
                                           params: Promise<{ article: string }>
                                       }>): Promise<Metadata> {

    const response = await getArticleApi((await params).article);

    if (!response.success) {
        return {
            title: "Статья не найдена",
            description: "Статья не найдена или была удалена",
            robots: { index: false, follow: false }
        };
    }

    const article = response.data;
    const categoryRes = await getCategoryApi(String(article.category_id));

    const category = categoryRes.success ? categoryRes.data.title : "Разработка";

    return {
        title: `${article.title}`,
        description: article.description,
        keywords: [
            article.title,
            category,
            "разработка",
            "программирование",
        ],

        alternates: {
            canonical: `https://webcos.ru/blog/${article.id}-${article.slug}`
        },

        openGraph: {
            title: article.title,
            description: article.description,
            url: `https://webcos.ru/blog/${article.id}-${article.slug}`,
            siteName: "Webcos",
            images: [
                {
                    url: article.image,
                    width: 1200,
                    height: 630,
                }
            ],
            locale: "ru_RU",
            type: "article",
            publishedTime: article.createdAt
        },

        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.description,
            images: [article.image]
        }
    };
}



export default async function Article({params}:
                                      Readonly<{
                                          params: Promise<{ article: string }>
                                          searchParams: Promise<{ [key: string]: string | string[] | undefined }>
                                      }>) {
    const {article} = await params

    return (
        <ArticlePage articleId={article}/>
    );
}
