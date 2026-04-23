import {redirect} from "next/navigation";

interface Project {
    albumId: number;
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export const getProjectApi = async (id: string): Promise<Project>  => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        next: { revalidate: 60 }
    })
    if (!response.ok) {
        redirect('/not-found')
    }

    return response.json()

}