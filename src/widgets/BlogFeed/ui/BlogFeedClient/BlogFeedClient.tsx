'use client';
import styles from './BlogFeedClient.module.css'
import React, {useEffect, useState} from "react";
import {IArticle} from "@/widgets/Blog";
import {BlogItem} from "@/entities/BlogItem";
import {getRecommendedArticlesApi} from "@/widgets/Blog/api/articlesApi";
import {ApiResult} from "@/shared/model";
import useSWRInfinite from "swr/infinite";
import {useInView} from "react-intersection-observer";


interface BlogFeed {
    initialArticles: IArticle[]
}

const PAGE_SIZE = 10;

export const BlogFeedClient = ({initialArticles}: BlogFeed) => {
    const [finished, setFinished] = useState(false);
    const { ref, inView } = useInView();

    const getKey = (
        pageIndex: number,
        previousPageData: ApiResult<IArticle[]> | null
    ) => {
        if (previousPageData && previousPageData.success && !previousPageData.data.length) {
            setFinished(true);
            return null;
        }

        return { page: pageIndex, size: PAGE_SIZE }
    }
    const { data, size, setSize, isValidating } = useSWRInfinite(
        getKey,
        ({ page, size }) => getRecommendedArticlesApi({ page, size }),
        {
            fallbackData: [
                {
                    success: true,
                    data: initialArticles
                }
            ]
        }
    );

    useEffect(() => {
        if (inView && !isValidating && !finished) {
            setSize((prevSize) => prevSize + 1);
        }
    }, [inView, isValidating, finished, setSize]);





    const articles = data
        ?.flatMap(page => page.success ? page.data : []) ?? [];


    return (

        <ul className={styles.blogLineList}>
            {articles.map(item =>
                <BlogItem imageHeight={350} id={String(item.id)} key={item.id} className={styles.blogLineItem} title={item.title} image={item.image} description={item.description}/>

            )}
            <div className={styles.blogLineItem}>
                {isValidating && size > 1 ? (
                    <div ref={ref}>Loading...</div>
                ) : (
                    <p className={styles.blogLineItem}>Больше нет статей для загрузки :(</p>
                )}
            </div>
        </ul>
    );
}

