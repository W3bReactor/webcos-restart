import {AdminArticlesEditPage} from "@/pages/AdminArticlesEditPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Изменение статьи",
} : {};


export default async function AdminArticlesEdit({params}:
                                                Readonly<{
                                                    params: Promise<{ article: string }>
                                                    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
                                                }>) {
    const {article} = await params
    return (
        <AdminArticlesEditPage articleId={article}/>
    );
}
