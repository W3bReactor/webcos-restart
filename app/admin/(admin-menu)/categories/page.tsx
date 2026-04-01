import {AdminCategoriesPage} from "@/pages/AdminCategoriesPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Категории",
} : {};


export default function AdminCategories() {
    return (
        <AdminCategoriesPage/>
    );
}
