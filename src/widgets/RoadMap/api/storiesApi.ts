import {ApiResult, PageResponse} from "@/shared/model";
import {IStory} from "@/widgets/RoadMap";
import {apiFetch} from "@/shared/api";
import {StoryCreate, StoryParams, StoryPositionUpdate, StoryUpdate} from "@/widgets/RoadMap/api/types";



export const getStoryApi = async (storyId: string): Promise<ApiResult<IStory>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/stories/${storyId}`,
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

export const getStoriesApi = async (params?: StoryParams): Promise<ApiResult<PageResponse<IStory>>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/stories?search=${params?.search ? params?.search : ""}${params?.size ? "&size=" + params?.size : ""}${params?.page ? "&page=" + params?.page : ""}`,
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




export const createStoryApi = async (body: StoryCreate): Promise<ApiResult<IStory>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/stories
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

export const updateStoryApi = async (body: StoryUpdate): Promise<ApiResult<IStory>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/stories
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

export const updateStoriesPositionApi = async (body: StoryPositionUpdate[]): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/stories/positions
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

        return { success: true, data: "" };

    } catch (error) {
        console.error("Backend unavailable:", error);

        return {
            success: false,
            error: "Backend unavailable"
        };
    }
}



export const deleteStoryApi = async (storyId: number): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/stories/${storyId}
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
