import styles from './Blog.module.css'
import React from "react";
import {getArticlesApi} from "@/widgets/Blog";
import {CloudAnimation} from "@/widgets/Blog/ui/CloudAnimation/CloudAnimation";
import {SectionDesc, SectionTitle, StandardBtn} from "@/shared/ui";
import {BlogItem} from "@/entities/BlogItem";


export const Blog = async () => {
    const response = await getArticlesApi({size: 6})

    return (

        <section className={styles.blogSection}>
            <CloudAnimation/>
            <div className={styles.blogWrapper}>
                <SectionTitle className={styles.blogTitle}>Блог</SectionTitle>
                <SectionDesc className={styles.blogDesc}>Даём ответы, которые тяжёло было найти в интернете</SectionDesc>
                <StandardBtn type={'site-link'} href={'/blog'} className={styles.blogBtn}>Открыть блог</StandardBtn>
                <ul className={styles.blogList}>
                    {response.success && response.data.content.length > 0 ? response.data.content.map(item =>
                        <BlogItem id={String(item.id)} image={item.image} key={item.id} className={styles.blogListItem} title={item.title} description={item.description}/>
                    )
                    :
                        <p>На данный момент статей нет :(</p>
                    }
                </ul>
            </div>
        </section>
    );
}

