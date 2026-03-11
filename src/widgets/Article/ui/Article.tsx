import React from "react";
import styles from './Article.module.css'
import Image from "next/image";
import {getArticleApi, } from "@/widgets/Article";
import {EyeIcon, ShareIcon} from "@/shared/assets";
import {BreadCrumbs} from "@/shared/ui";
import {getCategoryApi} from "@/views/BlogAllPage";


interface IArticle {
    id: string
}

export const Article = async ({id}: IArticle) => {
    const response = await getArticleApi(id)
    // TODO: Сделать рекомендованные статьи
    // const recommends = await getRecommendArticlesApi()
    const items = [
        {label: 'Блог', path: '/blog'},
        {label: response.success ? response.data.title : "Статья не найдена", path: '/blog/article'}
    ]
    if(!response.success) {
        return <div>Статья не найдена :(</div>
    }
    const responseCategory = await getCategoryApi(String(response.data.category_id))
    return (
            <div className={styles.articleColumn}>
                <BreadCrumbs items={items}/>
                <article className={styles.article}>
                    {response.data.image &&
                        <Image src={response.data.image} width={734} height={332} className={styles.articlePreviewImage} alt={response.data.title} />
                    }
                    <div className={styles.articleTop}>
                        <h2 className={styles.articleTitle}>{response.data.title}</h2>
                        <button className={styles.articleShare}><Image src={ShareIcon} alt={'Поделиться'} className={styles.articleShareIcon}/></button>
                    </div>
                    <div className={styles.articleInfo}>
                        <time className={styles.articleText}>21.06.2020</time>
                        {responseCategory.success &&
                            <p className={styles.articleText}>{responseCategory.data.title}</p>
                        }
                        <p className={styles.articleText}><Image alt={'Просмотры'} className={styles.articleViewsIcon} src={EyeIcon}/> {response.data.views}</p>
                    </div>
                    <div className={`${styles.articleContent}`} >
                        <div className={`${styles.articleDesc} ck-content ck-content--theme`} dangerouslySetInnerHTML={{__html: response.data.content}}></div>
                    </div>

                    {/*<div className={styles.articleContent}>*/}
                    {/*    <p className={styles.articleDesc}>{response.data.content}</p>*/}
                    {/*</div>*/}
                    {/*TODO: Сделать рекомендованные статьи*/}
                    {/*<div className={styles.articleRecommend}>*/}
                    {/*    <h2 className={styles.articleRecommendTitle}>Рекомендуем</h2>*/}
                    {/*    <ul className={styles.articleRecommendList}>*/}
                    {/*        {recommends.map(recommend =>*/}
                    {/*            <BlogItem key={recommend.id} image={recommend.thumbnailUrl} id={String(recommend.id)} className={styles.articleRecommendItem} title={recommend.title} description={'hello'}/>*/}

                    {/*        )}*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </article>

            </div>

    );
}



