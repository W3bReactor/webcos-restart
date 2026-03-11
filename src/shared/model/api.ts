export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export type ApiResult<T> =
    | { success: true; data: T }
    | { success: false; error: string };


export interface User {
    email: string
    isActivated: boolean;
    name: string;
    avatar?: string;
    id: string
}

export interface AuthResponse {
    accessToken: string;
    refreshToKen: string;
    user: User;
}
