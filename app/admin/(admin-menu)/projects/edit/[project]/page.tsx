import {AdminProjectsEditPage} from "@/pages/AdminProjectsEditPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


export async function generateMetadata(): Promise<Metadata> {
    const token =  (await cookies()).get("access_token");

    if (!token) return {};

    return {
        title: "Админ-панель / Изменение проекта",
    };
}



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
