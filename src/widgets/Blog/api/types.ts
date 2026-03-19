export interface ArticleParams {
    search?: string;
    sortBy?: string;
    order?: string;
    category?: string;
    size?: number;
    page?: number;
}

export interface RecommendedArticlesParams {
    size?: number;
    page?: number;
    exclude?: number[];
}

export interface ArticleCreate {
    title: string;
    description: string;
    content: string;
    category_id: number;
}

export interface ArticleUpdate {
    id: number;
    title: string;
    description: string;
    content: string;
    category_id: number;
}

export interface ArticleUploadImage {
    articleId: number;
    body: FormData;
}
