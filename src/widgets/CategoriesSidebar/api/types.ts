export interface CategoryParams {
    search?: string;
    size?: number;
    page?: number;
}

export interface CategoryCreate {
    title: string;
    description: string;
}

export interface CategoryUpdate {
    id: number;
    title: string;
    description: string;
}

export interface CategoryUploadImage {
    categoryId: number;
    body: FormData;
}
