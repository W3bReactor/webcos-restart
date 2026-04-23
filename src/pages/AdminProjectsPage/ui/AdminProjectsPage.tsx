"use client";
import styles from './AdminProjectsPage.module.css'
import {Footer, Header, AdminSidebar, AdminProjectsActions, AdminBanners} from "@/widgets";
import useSWR from "swr";
import {getBannersApi} from "@/shared/api";


export const AdminProjectsPage = () => {
    const {data: responseBanners} = useSWR(
        ["banners"],
        async () => await getBannersApi({type: "PROJECT"})
    )

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.adminArticlesWrapper}>
                    <AdminSidebar/>
                    <div className={styles.adminArticlesColumn}>
                        <h1 className={styles.adminArticlesTitle}>Проекты</h1>
                        <div className={styles.adminArticlesContent}>
                            {responseBanners?.success &&
                                <AdminBanners items={responseBanners.data.content} type={'projects'}/>
                            }
                            <AdminProjectsActions/>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>


        </div>
    );
}
