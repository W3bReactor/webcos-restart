import {ApiResult} from "@/shared/model";
import {MailSend} from "@/shared/api/mail/types";
import {CreateEmailResponseSuccess} from "resend";

export const sendMail = async (body: MailSend): Promise<ApiResult<CreateEmailResponseSuccess>>  => {
    try {
        const response = await fetch(
            `/api/send/`,
            {
                method: "POST",
                body: JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (!response.ok) {
            return {success: false, error: "Failed to send" };
        }

        return {success: true, data: await response.json()}

    } catch (error) {
        console.error("Backend unavailable:", error);

        return {
            success: false,
            error: "Backend unavailable"
        };
    }
}
