import {AdminArticlesCreatePage} from "@/pages/AdminArticlesCreatePage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Создание статьи",
} : {};


export default function AdminArticlesCreate() {
    return (
        <AdminArticlesCreatePage />
    );
}
