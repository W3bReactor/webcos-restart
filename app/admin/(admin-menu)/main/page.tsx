import {AdminMainPage} from "@/pages/AdminMainPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    const token =  (await cookies()).get("access_token");

    if (!token) return {};

    return {
        title: "Админ-панель / Главная",
    };
}

export default function AdminMain() {
    return (
        <AdminMainPage/>
    );
}
