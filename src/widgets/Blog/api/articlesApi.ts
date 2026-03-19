import {ApiResult, PageResponse} from "@/shared/model";
import {IArticle} from "@/widgets/Blog";
import {apiFetch} from "@/shared/api";
import {
    ArticleCreate,
    ArticleParams,
    ArticleUpdate,
    ArticleUploadImage,
    RecommendedArticlesParams
} from "@/widgets/Blog/api/types";

export const getArticlesApi = async (params?: ArticleParams): Promise<ApiResult<PageResponse<IArticle>>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles?search=${params?.search ? params?.search : ""}${params?.sortBy ? "&sortBy=" + params?.sortBy : ""}${params?.order ? "&order=" + params?.order : ""}${params?.size ? "&size=" + params?.size : ""}${params?.page ? "&page=" + params?.page : ""}${params?.category ? "&categoryId=" + params?.category : ""}
            `,
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

export const getRecommendedArticlesApi = async (params?: RecommendedArticlesParams): Promise<ApiResult<IArticle[]>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles/recommendations?size=${params?.size ? params?.size : ""}${params?.page ? "&page=" + params?.page : ""}${params?.exclude ? "&exclude=" + params?.exclude.join(",") : ""}
            `,
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



export const createArticleApi = async (body: ArticleCreate): Promise<ApiResult<IArticle>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles
            `,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
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

export const updateArticleApi = async (body: ArticleUpdate): Promise<ApiResult<IArticle>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles
            `,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
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


export const deleteArticleApi = async (articleId: number): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles/${articleId}
            `,
            {
                method: "DELETE",
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



export const uploadImageArticleApi = async (data: ArticleUploadImage): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/articles/${data.articleId}/image
            `,
            {
                method: "POST",
                body: data.body,
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




