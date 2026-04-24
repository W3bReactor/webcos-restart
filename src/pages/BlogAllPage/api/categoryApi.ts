import {ApiResult} from "@/shared/model";
import {apiFetch} from "@/shared/api";
import {ICategory} from "@/widgets/CategoriesSidebar";



export const getCategoryApi = async (categoryId: string): Promise<ApiResult<ICategory>>  => {
    try {
        const response = await apiFetch(
            `/api/v1/categories/${categoryId}`,
            {
                next: { revalidate: 60 },
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
