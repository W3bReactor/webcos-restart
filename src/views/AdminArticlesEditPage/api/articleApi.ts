import {AxiosResponse} from "axios";
import $api from "@/shared/api/api";

interface Article {
    albumId: number;
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export const getArticleApi = async (id: string): Promise<AxiosResponse<Article[]>>  => {
    // const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
    //     cache: "force-cache",
    //     next: {
    //         revalidate: 1
    //     }
    // })
    // if (!response.ok) {
    //     redirect('/not-found')
    // }

    return $api.get<Article[]>(`https://jsonplaceholder.typicode.com/photos/${id}`)

}
// static fetchSwitches(params?: IQuery): Promise<AxiosResponse<ISwitch[]>> {
//     return $api.get<ArticleReadTracker[]>(`/switch?${params?.search ? 'search='+params.search : ''}`)
// }
