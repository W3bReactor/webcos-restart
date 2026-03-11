import styles from './AdminCategoriesPage.module.css'
import {Footer, Header, AdminSidebar, AdminCategories} from "@/widgets";



export const AdminCategoriesPage = async () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.adminMainWrapper}>
                    <AdminSidebar/>
                    <AdminCategories/>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
