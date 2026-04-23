'use server';
import React from "react";
import styles from './Article.module.css'
import Image from "next/image";
import {EyeIcon, ShareIcon} from "@/shared/assets";
import {BreadCrumbs} from "@/shared/ui";
import {getCategoryApi} from "@/pages/BlogAllPage";
import {ArticleReadTracker} from "@/widgets/Article/ui/ArticleReadTracker/ArticleReadTracker";
import { cookies } from 'next/headers'
import {ApiResult} from "@/shared/model";
import {apiFetch} from "@/shared/api";
import {IArticle as IArticleApi} from "@/widgets/Blog";
import {getRecommendedArticlesApi} from "@/widgets/Blog/api/articlesApi";
import {BlogItem} from "@/entities/BlogItem";
import {getDate} from "@/shared/lib";
import {redirect} from "next/navigation";

interface IArticle {
    id: string
}

const getArticleApi = async (articleId: string): Promise<ApiResult<IArticleApi>>  => {
    try {
        const cookieStore = await cookies();
        const cookieHeader = cookieStore.toString();
        const response = await apiFetch(
            `/api/v1/articles/${articleId}`,
            {
                headers: {
                    Cookie: cookieHeader
                },
                next: { revalidate: 60 }
            }
        );

        if (!response.ok) {
            return { success: false, error: "Failed to fetch" };
        }

        return { success: true, data: await response.json() };

    } catch (error) {
        console.error("Backend unavailable:", error);

        return {
            success: false,
            error: "Backend unavailable"
        };
    }
}

export const Article = async ({id}: IArticle) => {
    const response = await getArticleApi(id)

    const items = [
        {label: 'Блог', path: '/blog'},
        {label: response.success ? response.data.title : "Статья не найдена", path: '/blog/article'}
    ]
    if(!response.success) {
        return <div>Статья не найдена :(</div>
    }
    const responseCategory = await getCategoryApi(String(response.data.category_id))

    const responseRecommend = await getRecommendedArticlesApi({size: 2, exclude: [response.data.id]})

    const correctSlug = response.success ? `${response.data.id}-${response.data.slug}` : "";
    if (response.success && id !== correctSlug) {
        redirect(`/blog/${correctSlug}`)
    }


    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": response.data.title,
        "description": response.data.description,
        "image": response.data.image,
        "author": {
            "@type": "Organization",
            "name": "Webcos"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Webcos",
            "logo": {
                "@type": "ImageObject",
                "url": "https://webcos.ru/webcos-logo.svg"
            }
        },
        "datePublished": response.data.createdAt,
        "dateModified": response.data.createdAt,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://webcos.ru/blog/${response.data.id}-${response.data.slug}`
        }
    }

    return (
            <div className={styles.articleColumn}>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
                />
                <BreadCrumbs className={styles.articleBreadCrumbs} items={items}/>
                <article className={styles.article}>
                    <ArticleReadTracker articleId={response.data.id}/>
                    {response.data.image &&
                        <Image src={response.data.image} width={734} height={332} className={styles.articlePreviewImage} alt={response.data.title} />
                    }
                    <div className={styles.articleTop}>
                        <h2 className={styles.articleTitle}>{response.data.title}</h2>
                        <button className={styles.articleShare}><Image src={ShareIcon} alt={'Поделиться'} className={styles.articleShareIcon}/></button>
                    </div>
                    <div className={styles.articleInfo}>
                        <time className={styles.articleText}>{getDate(new Date(response.data.createdAt))}</time>
                        {responseCategory.success &&
                            <p className={styles.articleText}>{responseCategory.data.title}</p>
                        }
                        <p className={styles.articleText}><Image alt={'Просмотры'} className={styles.articleViewsIcon} src={EyeIcon}/> {response.data.views}</p>
                    </div>
                    <div className={`${styles.articleContent}`} >
                        <div className={`${styles.articleDesc} ck-content ck-content--theme`} dangerouslySetInnerHTML={{__html: response.data.content}}></div>
                    </div>
                    {responseRecommend.success && responseRecommend.data.length > 0 &&
                        <div className={styles.articleRecommend}>
                            <h2 className={styles.articleRecommendTitle}>Рекомендуем</h2>
                            <ul className={styles.articleRecommendList}>
                                {responseRecommend.data.map(recommend =>
                                    <BlogItem slug={recommend.slug} key={recommend.id} image={recommend.image} id={String(recommend.id)} className={styles.articleRecommendItem} title={recommend.title} description={recommend.description}/>
                                )}
                            </ul>
                        </div>
                    }
                </article>

            </div>

    );
}



