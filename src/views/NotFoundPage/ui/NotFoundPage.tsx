import styles from "./NotFoundPage.module.css";
import {Header} from "@/widgets";
import Link from "next/link";
import Image from "next/image";
import {NotFoundImage} from "@/views/NotFoundPage";
import {FooterNotFound} from "@/widgets/FooterNotFound";

export const NotFoundPage = () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <div className={'not-found__content'}>
                    <h1 className={'not-found__title'}>Страница не найдена :(</h1>
                    <p className={'not-found__desc'}>Возможно страница появится позже.<br/> Вернуться на <Link className={'not-found__link'} href={'/'}>Главную</Link> </p>
                    <Image className={'not-found__image'} src={NotFoundImage} alt={'Грустный хомяк'}/>
                </div>

            </main>
            <FooterNotFound/>
        </div>
    );
};

