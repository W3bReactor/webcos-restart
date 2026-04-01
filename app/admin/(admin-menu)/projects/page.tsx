import {AdminProjectsPage} from "@/pages/AdminProjectsPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Проекты",
} : {};


export default function AdminProjects() {
    return (
        <AdminProjectsPage/>
    );
}
