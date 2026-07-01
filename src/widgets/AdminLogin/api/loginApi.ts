import {ApiResult} from "@/shared/model";
import {AuthResponse} from "@/widgets/AdminLogin";

export const login = async (email: string, password: string): Promise<ApiResult<AuthResponse>>  => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/login`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
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
