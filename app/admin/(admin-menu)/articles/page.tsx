import {AdminArticlesPage} from "@/pages/AdminArticlesPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Статьи",
} : {};


export default function AdminArticles() {
    return (
        <AdminArticlesPage/>
    );
}
