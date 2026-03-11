export interface ProjectParams {
    search?: string;
    size?: number;
    page?: number;
}


export interface ProjectCreate {
    title: string;
    description: string;
    project_link: string;
}

export interface ProjectUpdate {
    id: number;
    title: string;
    description: string;
    project_link: string;
}

export interface ProjectUploadImage {
    projectId: number;
    body: FormData;
}
