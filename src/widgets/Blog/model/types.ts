import {JSONContent} from "@tiptap/core";

export interface IArticle {
    id: number
    title: string
    project_link: string;
    description: string
    image: string;
    views: number
    createdAt: string
    content: JSONContent
    category_id: number
    slug: string;
}