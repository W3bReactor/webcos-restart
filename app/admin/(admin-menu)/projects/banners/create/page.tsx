import {AdminBannersCreatePage} from "@/pages";
import {cookies} from "next/headers";
import type {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    const token =  (await cookies()).get("access_token");

    if (!token) return {};

    return {
        title: "Админ-панель / Создание баннера",
    };
}



export default function AdminBannersCreate() {
    return (
        <AdminBannersCreatePage type={'projects'}/>
    );
}
