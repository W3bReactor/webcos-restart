import {ApiResult, PageResponse} from "@/shared/model";
import {apiFetch} from "@/shared/api";
import {ICategory} from "@/widgets/CategoriesSidebar";
import {
    CategoryCreate,
    CategoryParams,
    CategoryUpdate,
    CategoryUploadImage
} from "@/widgets/CategoriesSidebar/api/types";

export const getCategoriesApi = async (params?: CategoryParams): Promise<ApiResult<PageResponse<ICategory>>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/categories?search=${params?.search ? params?.search : ""}${params?.size ? "&size=" + params?.size : ""}${params?.page ? "&page=" + params?.page : ""}`,
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


export const createCategoryApi = async (body: CategoryCreate): Promise<ApiResult<ICategory>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/categories
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

export const updateCategoryApi = async (body: CategoryUpdate): Promise<ApiResult<ICategory>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/categories
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


export const deleteCategoryApi = async (categoryId: number): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/categories/${categoryId}
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



export const uploadImageCategoryApi = async (data: CategoryUploadImage): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/categories/${data.categoryId}/image
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

