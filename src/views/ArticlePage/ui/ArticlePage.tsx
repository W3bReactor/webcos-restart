import styles from './ArticlePage.module.css'
import {Footer, Header, Social, Article, Sidebar} from "@/widgets";
import React from "react";


interface IArticlePage {
    articleId: string
}

export const ArticlePage = async ({articleId}: IArticlePage) => {
    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.articleWrapper}>
                    <Article id={articleId}/>
                    <Sidebar className={styles.articleSidebar}/>
                </section>

            <Social href={'#'} platform={"Телеграм"} title={'Понравилась статья?'} description={'Заходите к нам в телеграм и узнавайте про новые продукты первыми!'}/>
            </main>
            <Footer/>
        </div>
    );
}
