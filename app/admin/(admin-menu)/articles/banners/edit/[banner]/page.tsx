import {AdminBannersEditPage} from "@/pages";
import {cookies} from "next/headers";
import type {Metadata} from "next";


export async function generateMetadata(): Promise<Metadata> {
    const token =  (await cookies()).get("access_token");

    if (!token) return {};

    return {
        title: "Админ-панель / Изменение баннера",
    };
}



export default async function AdminBannersEdit({params}:
                                                Readonly<{
                                                    params: Promise<{ banner: string }>
                                                    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
                                                }>) {
    const {banner} = await params
    return (
        <AdminBannersEditPage bannerId={banner} type={'articles'}/>
    );
}
