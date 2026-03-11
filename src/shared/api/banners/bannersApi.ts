import {IBanner} from "@/widgets/Slider";
import {ApiResult, PageResponse} from "@/shared/model";
import {BannerCreate, BannersParams, BannerUpdate, BannerUploadImage} from "@/shared/api/banners/types";
import {apiFetch} from "@/shared/api";



export const getBannerApi = async (bannerId: string): Promise<ApiResult<IBanner>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/banners/${bannerId}`,
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


export const getBannersApi = async (params?: BannersParams): Promise<ApiResult<PageResponse<IBanner>>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/banners?search=${params?.search ? params?.search : ""}${params?.sortBy ? "&sortBy=" + params?.sortBy : ""}${params?.order ? "&order=" + params?.order : ""}${params?.size ? "&size=" + params?.size : ""}${params?.page ? "&page=" + params?.page : ""}${params?.type ? "&type=" + params?.type : ""}`,
            {
                cache: "force-cache",
                next: { revalidate: 1 },
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

export const createBannerApi = async (body: BannerCreate): Promise<ApiResult<IBanner>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/banners
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

export const updateBannerApi = async (body: BannerUpdate): Promise<ApiResult<IBanner>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/banners
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


export const deleteBannerApi = async (bannerId: number): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/banners/${bannerId}
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



export const uploadImageBannerApi = async (data: BannerUploadImage): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/banners/${data.bannerId}/image
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








