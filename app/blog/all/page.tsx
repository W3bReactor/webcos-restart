import {BlogAllPage} from "@/views/BlogAllPage";



export default async function BlogAll({searchParams}:
                                    Readonly<{
                                        searchParams: Promise<{ [key: string]: string }>
                                    }>) {
    const search = await searchParams
    return (
        <BlogAllPage searchParams={search}/>
    );
}
