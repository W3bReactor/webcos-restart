import {ApiResult} from "@/shared/model";
import {AuthResponse} from "@/widgets/AdminLogin";

export const login = async (email: string, password: string): Promise<ApiResult<AuthResponse>>  => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL}/api/login`,
            {
                cache: "no-store",
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-type': 'application/json'
                }
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
