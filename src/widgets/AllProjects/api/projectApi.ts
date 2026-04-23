interface Product {
    albumId: number;
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export const getProjectApi = async (): Promise<Product[]>  => {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=8', {
        next: { revalidate: 60 }
    })
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    return response.json()

}
