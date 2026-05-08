import styles from './Contacts.module.css'
import {BlackBtn, SectionDesc, SectionTitle} from "@/shared/ui";
import {
    DzenIcon,
    TgWhiteIcon,
    TiktokWhiteIcon,
    VkWhiteIcon
} from "@/shared/assets";

export const Contacts = () => {
    return (
        <section className={styles.contacts}>
            <SectionTitle className={styles.contactsTitle}>Следи за нами</SectionTitle>
            <SectionDesc className={styles.contactsDesc}>Будь вкурсе всех новостей</SectionDesc>
            <ul className={styles.contactsList}>
                <li className={styles.contactsItem}>
                    <BlackBtn srcImage={TgWhiteIcon.src} type={'link'} href="https://t.me/webcostech" target={"_blank"} className={styles.contactsBtn}>Подписаться на Телеграм</BlackBtn>
                </li>


                <li className={styles.contactsItem}>
                    <BlackBtn srcImage={DzenIcon.src} type={'link'} href="https://dzen.ru/webcos" target={"_blank"} className={styles.contactsBtn}>Подписаться на Дзен</BlackBtn>
                </li>

                <li className={styles.contactsItem}>
                    <BlackBtn srcImage={TiktokWhiteIcon} type={'link'} href="https://www.tiktok.com/@webcostech" target={"_blank"} className={styles.contactsBtn}>Подписаться на Тик-ток</BlackBtn>
                </li>

            </ul>
        </section>
    );
}
