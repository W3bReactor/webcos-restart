import {AxiosResponse} from "axios";
import $api from "@/shared/api/api";

interface Project {
    albumId: number;
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export const getProjectApi = async (id: string): Promise<AxiosResponse<Project[]>>  => {


    return $api.get<Project[]>(`https://jsonplaceholder.typicode.com/photos/${id}`)

}
