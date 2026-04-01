import {AdminMainPage} from "@/pages/AdminMainPage";
import {cookies} from "next/headers";
import type {Metadata} from "next";

let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Главная",
} : {};


export default function AdminMain() {
    return (
        <AdminMainPage/>
    );
}
