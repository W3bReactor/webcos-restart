import {AdminStoryPage} from "@/pages/AdminStoryPage";
import type {Metadata} from "next";
import {cookies} from "next/headers";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / История",
} : {};

export default function AdminStory() {
    return (
        <AdminStoryPage/>
    );
}
