"use client"
import styles from './AdminArticlesPage.module.css'
import {Footer, Header, AdminSidebar, AdminArticlesActions, AdminBanners} from "@/widgets";
import {getBannersApi} from "@/shared/api";
import useSWR from "swr";



export const AdminArticlesPage = () => {
    const { data: responseBanners, mutate } = useSWR(
        ["banners"],
        async () => await getBannersApi({type: "ARTICLE"})
    )

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.adminArticlesWrapper}>
                    <AdminSidebar/>
                    <div className={styles.adminArticlesColumn}>
                        <h1 className={styles.adminArticlesTitle}>Статьи</h1>
                        <div className={styles.adminArticlesContent}>
                            {responseBanners?.success &&
                                <AdminBanners items={responseBanners.data.content} type={'articles'}/>
                            }
                            <AdminArticlesActions/>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>


        </div>
    );
}
