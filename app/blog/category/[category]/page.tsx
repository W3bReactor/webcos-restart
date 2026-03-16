import {BlogAllPage} from "@/pages/BlogAllPage";



export default async function BlogCategory({searchParams, params}:
                                    Readonly<{
                                        params: Promise<{ category: string }>
                                        searchParams: Promise<{ [key: string]: string }>
                                    }>) {
    const search = await searchParams
    const {category} = await params;
    return (
        <BlogAllPage categoryId={category} searchParams={search}/>
    );
}
