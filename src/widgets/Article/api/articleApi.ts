import {ApiResult} from "@/shared/model";
import {IArticle} from "@/widgets/Blog";
import {apiFetch} from "@/shared/api";
import {ArticleReadTime} from "@/widgets/Article/api/types";

export const getArticleApi = async (articleId: string): Promise<ApiResult<IArticle>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles/${articleId}`,
            {
                next: { revalidate: 60 }
            }
        );

        if (!response.ok) {
            return { success: false, error: "Failed to fetch" };
        }

        return { success: true, data: await response.json() };

    } catch (error) {
        console.error("Backend unavailable:", error);

        return {
            success: false,
            error: "Backend unavailable"
        };
    }
}

export const setReadTimeArticleApi = async (data: ArticleReadTime): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles/${data.articleId}`,
            {
                body: JSON.stringify({read_time: data.readTime}),
            }
        );

        if (!response.ok) {
            return { success: false, error: "Failed to fetch" };
        }

        return { success: true, data: "" };

    } catch (error) {
        console.error("Backend unavailable:", error);

        return {
            success: false,
            error: "Backend unavailable"
        };
    }
}

