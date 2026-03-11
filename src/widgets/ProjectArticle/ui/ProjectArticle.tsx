import React from "react";
import styles from './ProjectArticle.module.css'
import Image from "next/image";
import {getProjectApi} from "@/widgets/ProjectArticle";
import {EyeIcon, ShareIcon} from "@/shared/assets";
import {BreadCrumbs, PurpleBtn} from "@/shared/ui";
import {Sidebar} from "@/widgets/Sidebar";




export const ProjectArticle = async ({id}: {id: string}) => {
    const data = await getProjectApi(id)
    const items = [
        {label: 'Проекты', path: '/projects'},
        {label: data.title, path: `/projects/${id}`}
    ]
    return (
        <section className={styles.projectArticleWrapper}>
            <div className={styles.projectArticleColumn}>
                <BreadCrumbs items={items}/>
                <article className={styles.projectArticle}>
                    <Image src={data.url} width={734} height={332} className={styles.projectArticlePreviewImage} alt={data.title} />
                    <div className={styles.projectArticleTop}>
                        <h2 className={styles.projectArticleTitle}>{data.title}</h2>
                        <button className={styles.projectArticleShare}><Image alt={'Поделиться'} src={ShareIcon} className={styles.projectArticleShareIcon}/></button>
                    </div>
                    <div className={styles.projectArticleInfo}>
                        <time className={styles.projectArticleText}>21.06.2020</time>
                        <p className={styles.projectArticleText}>создание сайтов</p>
                        <p className={styles.projectArticleText}><Image alt={'Просмотры'} className={styles.projectArticleViewsIcon} src={EyeIcon}/> 1000</p>
                    </div>
                    <div className={styles.projectArticleContent}>
                        <p className={styles.projectArticleDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                    </div>
                    <PurpleBtn type={'link'} href={'#'} target={'_blank'} className={styles.projectArticleBtn}>Открыть</PurpleBtn>
                </article>

            </div>
            <Sidebar className={styles.projectArticleSidebar}/>
        </section>

    );
}

