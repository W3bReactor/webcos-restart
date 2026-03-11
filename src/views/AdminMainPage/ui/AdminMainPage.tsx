import styles from './AdminMainPage.module.css'
import {Footer, Header, AdminSidebar, AdminMain} from "@/widgets";



export const AdminMainPage = async () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.adminMainWrapper}>
                    <AdminSidebar/>
                    <AdminMain/>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
