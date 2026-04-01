import {MetadataRoute} from "next";
import {getArticlesApi} from "@/widgets/Blog";
import {getCategoriesApi} from "@/widgets/CategoriesSidebar";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

    const articlesUrls = [];

    let page = 0;
    let totalPages = 1;

    while (page < totalPages) {
        const res = await getArticlesApi({ page, size: 100 });

        if (!res.success) break;

        articlesUrls.push(
            ...res.data.content.map(article => ({
                url: `https://webcos.ru/blog/${article.id}`,
                lastModified: article.createdAt,
                priority: 0.9
            }))
        );

        totalPages = res.data.totalPages;
        page++;
    }

    const categoriesUrls = [];

    page = 0;
    totalPages = 1;

    while (page < totalPages) {
        const res = await getCategoriesApi({ page, size: 100 });

        if (!res.success) break;

        categoriesUrls.push(
            ...res.data.content.map(category => ({
                url: `https://webcos.ru/blog/category${category.id}`,
                lastModified: new Date(),
                priority: 0.8
            }))
        );

        totalPages = res.data.totalPages;
        page++;
    }


    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1
        },
        {
            url: `${baseUrl}/developers`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.6
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.9
        },
        {
            url: `${baseUrl}/blog/all`,
            lastModified: new Date(),
            changeFrequency: "always",
            priority: 0.9
        },
        {
            url: `${baseUrl}/projects`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8
        },
        {
            url: `${baseUrl}/cookie-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5
        },
        {
            url: `${baseUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5
        },
        ...articlesUrls,
        ...categoriesUrls

    ]
}