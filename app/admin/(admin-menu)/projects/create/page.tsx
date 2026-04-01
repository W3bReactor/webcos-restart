import {AdminProjectsCreatePage} from "@/pages/AdminProjectsCreatePage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Создание проекта",
} : {};


export default function AdminProjectsCreate() {
    return (
        <AdminProjectsCreatePage/>
    );
}
