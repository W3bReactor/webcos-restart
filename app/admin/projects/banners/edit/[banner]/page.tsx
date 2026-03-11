import {AdminBannersEditPage} from "@/views";

export default async function AdminBannersEdit({params}:
                                                Readonly<{
                                                    params: Promise<{ banner: string }>
                                                    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
                                                }>) {
    const {banner} = await params
    return (
        <AdminBannersEditPage bannerId={banner} type={'projects'}/>
    );
}
