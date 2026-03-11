'use client'
import styles from './AdminBannersCreatePage.module.css'
import {Footer, Header, AdminSidebar, AdminBannerForm} from "@/widgets";


interface IAdminBannersCreate {
    type: 'articles' | 'projects'
}


export const AdminBannersCreatePage = ({type}: IAdminBannersCreate) => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.adminCreateWrapper}>
                    <AdminSidebar/>
                    <div className={styles.adminCreateColumn}>
                        <h1 className={styles.adminCreateTitle}>Создание баннера {type === 'articles' ? 'статьи' : 'продукта'}</h1>
                        <div className={styles.adminCreateContent}>
                            <AdminBannerForm formType={'create'} type={type}/>
                        </div>
                    </div>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
