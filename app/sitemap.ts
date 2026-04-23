import {MetadataRoute} from "next";
import {IArticle} from "@/widgets/Blog";
import {ICategory} from "@/widgets/CategoriesSidebar";
import {ApiResult, PageResponse} from "@/shared/model";

async function safeFetch<T>(url: string): Promise<ApiResult<PageResponse<T>> | null> {
    try {
        const res = await fetch(url, {
                next: { revalidate: 0 },
        });

        if (!res.ok) return null;

        return await res.json();
    } catch {
        return null;
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";

    const articlesUrls = [];

    let page = 0;
    let totalPages = 1;

    while (page < totalPages) {
        const res = await safeFetch<IArticle>(`${baseUrl}/api/v1/articles?page=${page}&size=100`);

        // const res =  await getArticlesApi({ page, size: 100 });

        if(res == null) {
            break;
        }

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
        const res = await safeFetch<ICategory>(`${baseUrl}/api/v1/categories?page=${page}&size=100`);
        // const res = await getCategoriesApi({ page, size: 100 });

        if(res == null) {
            break;
        }

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