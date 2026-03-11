import {ApiResult} from "@/shared/model";
import {IArticle} from "@/widgets/Blog";
import {apiFetch} from "@/shared/api";


export const getArticleApi = async (articleId: string): Promise<ApiResult<IArticle>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles/${articleId}`,
            {
                cache: "force-cache",
                next: { revalidate: 1 }
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
