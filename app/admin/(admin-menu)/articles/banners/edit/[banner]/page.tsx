import {AdminBannersEditPage} from "@/pages";
import {cookies} from "next/headers";
import type {Metadata} from "next";


let token = (await cookies()).get("access_token")


export const metadata: Metadata = token ? {
    title: "Админ-панель / Изменение баннера",
} : {};


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
