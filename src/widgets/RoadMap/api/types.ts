export interface StoryParams {
    search?: string;
    size?: number;
    page?: number;
}


export interface StoryCreate {
    title: string;
    title_continue: string;
    year: string;
}

export interface StoryUpdate {
    id: number;
    title: string;
    title_continue: string;
    year: string;
    position?: number;
}

export interface StoryPositionUpdate {
    id: number;
    position: number;
}
