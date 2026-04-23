import {AdminProjectsCreatePage} from "@/pages/AdminProjectsCreatePage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


export async function generateMetadata(): Promise<Metadata> {
    const token =  (await cookies()).get("access_token");

    if (!token) return {};

    return {
        title: "Админ-панель / Создание проекта",
    };
}


export default function AdminProjectsCreate() {
    return (
        <AdminProjectsCreatePage/>
    );
}
