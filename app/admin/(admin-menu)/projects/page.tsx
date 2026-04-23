import {AdminProjectsPage} from "@/pages/AdminProjectsPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    const token =  (await cookies()).get("access_token");

    if (!token) return {};

    return {
        title: "Админ-панель / Проекты",
    };
}


export default function AdminProjects() {
    return (
        <AdminProjectsPage/>
    );
}
