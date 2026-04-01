import {AdminProjectsEditPage} from "@/pages/AdminProjectsEditPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Изменение проекта",
} : {};


export default async function AdminProjectsEdit({params}:
                                                Readonly<{
                                                    params: Promise<{ project: string }>
                                                    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
                                                }>) {
    const {project} = await params
    return (
        <AdminProjectsEditPage projectId={project}/>
    );
}
