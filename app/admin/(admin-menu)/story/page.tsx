import {AdminStoryPage} from "@/pages/AdminStoryPage";
import type {Metadata} from "next";
import {cookies} from "next/headers";


export async function generateMetadata(): Promise<Metadata> {
    const token =  (await cookies()).get("access_token");

    if (!token) return {};

    return {
        title: "Админ-панель / История",
    };
}


export default function AdminStory() {
    return (
        <AdminStoryPage/>
    );
}
