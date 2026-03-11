import styles from './AdminLoginPage.module.css'
import {Footer, Header, AdminLogin} from "@/widgets";



export const AdminLoginPage = async () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <AdminLogin/>
            </main>
            <Footer/>


        </div>
    );
}
