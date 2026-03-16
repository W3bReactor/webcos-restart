import {ArticlePage} from "@/pages/ArticlePage";


export default async function Article({params}:
                                          Readonly<{
                                              params: Promise<{ article: string }>
                                              searchParams: Promise<{ [key: string]: string | string[] | undefined }>
                                          }>) {
    const {article} = await params
    return (
        <ArticlePage  articleId={article}/>
    );
}
