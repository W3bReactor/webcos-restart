import styles from "./PickupColorPage.module.css";
import {Header, Footer, Social, PickupColor} from "@/widgets";

export const PickupColorPage = () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>

                <PickupColor/>


                <Social
                    href={'#'}
                    platform={"Телеграм"}
                    title={'Хотите больше сервисов?'}
                    description={'Заходите к нам в телеграм. Там вы найдёте фишки, про которые возможно и не знали, а также будете вкурсе появления новых сервисов.'}
                />
            </main>
            <Footer/>
        </div>
    );
};

