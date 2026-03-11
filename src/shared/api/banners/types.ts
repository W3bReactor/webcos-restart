export interface BannersParams {
    search?: string;
    sortBy?: string;
    order?: string;
    type?: string;
    size?: number;
    page?: number;
}

export interface BannerCreate {
    suptitle: string;
    title: string;
    btn_name: string;
    link: string;
    type: 'PROJECT' | 'ARTICLE'
}

export interface BannerUpdate {
    id: number;
    suptitle: string;
    title: string;
    btn_name: string;
    link: string;
    type: 'PROJECT' | 'ARTICLE'
}

export interface BannerUploadImage {
    bannerId: number;
    body: FormData;
}
