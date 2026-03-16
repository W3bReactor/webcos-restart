import {AdminArticlesEditPage} from "@/pages/AdminArticlesEditPage";

export default async function AdminArticlesEdit({params}:
                                                Readonly<{
                                                    params: Promise<{ article: string }>
                                                    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
                                                }>) {
    const {article} = await params
    return (
        <AdminArticlesEditPage articleId={article}/>
    );
}
