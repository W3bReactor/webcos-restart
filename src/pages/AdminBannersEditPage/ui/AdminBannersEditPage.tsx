'use client'
import styles from './AdminBannersEditPage.module.css'
import {Footer, Header, AdminSidebar, AdminBannerForm} from "@/widgets";
import useSWR from "swr";
import {getBannerApi} from "@/shared/api/banners/bannersApi";
import {redirect} from "next/navigation";
import {toInteger} from "es-toolkit/compat";


interface IAdminBannersEdit {
    type: 'articles' | 'projects'
    bannerId: string;
}


export const AdminBannersEditPage = ({type, bannerId}: IAdminBannersEdit) => {

    const {data: responseBanner, isLoading} = useSWR(
        ["banner"],
        async () => await getBannerApi(bannerId)
    )
    console.log(responseBanner)


    if(isLoading) {
        return <div>Загрузка</div>
    }
    if (!responseBanner?.success) {
        redirect("/404")
    }
    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.adminCreateWrapper}>
                    <AdminSidebar/>
                    <div className={styles.adminCreateColumn}>
                        <h1 className={styles.adminCreateTitle}>Изменение
                            баннера {type === 'articles' ? 'статьи' : 'продукта'}</h1>
                        <div className={styles.adminCreateContent}>
                            <AdminBannerForm
                                bannerId={toInteger(bannerId)}
                                supTitle={responseBanner.data.suptitle}
                                button={responseBanner.data.btn_name}
                                title={responseBanner.data.title}
                                link={responseBanner.data.link}
                                image={responseBanner.data.image}
                                formType={'edit'}
                                type={type}
                            />
                        </div>
                    </div>
                </section>

            </main>
            <Footer/>
        </div>
    );
}
