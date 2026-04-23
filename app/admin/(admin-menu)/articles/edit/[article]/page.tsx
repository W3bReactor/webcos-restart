import {AdminArticlesEditPage} from "@/pages/AdminArticlesEditPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


export async function generateMetadata(): Promise<Metadata> {
    const token =  (await cookies()).get("access_token");

    if (!token) return {};

    return {
        title: "Админ-панель / Изменение статьи",
    };
}


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
