import {ApiResult, PageResponse} from "@/shared/model";
import {IProject} from "@/widgets/Projects";
import {apiFetch} from "@/shared/api";
import {ProjectCreate, ProjectParams, ProjectUpdate, ProjectUploadImage} from "@/widgets/Projects/api/types";

export const getProjectApi = async (projectId: string): Promise<ApiResult<IProject>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/projects/${projectId}`,
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

export const getProjectsApi = async (params?: ProjectParams): Promise<ApiResult<PageResponse<IProject>>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/projects?search=${params?.search ? params?.search : ""}${params?.size ? "&size=" + params?.size : ""}${params?.page ? "&page=" + params?.page : ""}`,
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


export const createProjectApi = async (body: ProjectCreate): Promise<ApiResult<IProject>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/projects
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

export const updateProjectApi = async (body: ProjectUpdate): Promise<ApiResult<IProject>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/projects
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


export const deleteProjectApi = async (projectId: number): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/projects/${projectId}
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



export const uploadImageProjectApi = async (data: ProjectUploadImage): Promise<ApiResult<string>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/projects/${data.projectId}/image
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

