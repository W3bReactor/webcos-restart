import styles from './FooterNotFound.module.css'
import Image from "next/image";
import React from "react";
import {
    DzenIcon,
    LogoBlackIcon,
    LogoIcon,
    TgWhiteIcon,
    TiktokWhiteIcon,
    VkWhiteIcon
} from "@/shared/assets";
import Link from "next/link";
import {LightHouseAnimation} from "@/widgets/FooterNotFound/ui/LightHouseAnimation/LightHouseAnimation";

export const FooterNotFound = () => {
    return (
        <footer className={styles.footer}>
            <LightHouseAnimation/>
            <div className={styles.footerWrapper}>
                <div className={styles.footerTop}>
                    <div className={styles.footerContent}>
                        <Image data-hide-on-theme="light" src={LogoIcon} alt={'Логотип'}/>
                        <Image data-hide-on-theme="dark" src={LogoBlackIcon} alt={'Логотип'}/>
                    </div>

                </div>
                <div className={styles.footerColumns}>
                    <ul className={styles.footerList}>
                        <li className={styles.footerItem}>
                            <h3 className={styles.footerItemTitle}>Навигация</h3>
                        </li>
                        <li className={styles.footerItem}>
                            <Link href={'/projects'} className={styles.footerItemLink}>Проекты</Link>
                        </li>
                        <li className={styles.footerItem}>
                            <Link href={'/developers'} className={styles.footerItemLink}>Разработчики</Link>
                        </li>
                        <li className={styles.footerItem}>
                            <Link href={'/blog'} className={styles.footerItemLink}>Блог</Link>
                        </li>
                    </ul>
                    <ul className={styles.footerList}>
                        <li className={styles.footerItem}>
                            <h3 className={styles.footerItemTitle}>Информация</h3>
                        </li>
                        <li className={styles.footerItem}>
                            <Link href={'/#roadmap'} className={styles.footerItemLink}>Наш путь</Link>
                        </li>
                    </ul>

                    <ul className={styles.footerList}>
                        <li className={styles.footerItem}>
                            <h3 className={styles.footerItemTitle}>Документы</h3>
                        </li>
                        <li className={styles.footerItem}>
                            <Link href={'/privacy-policy'} className={styles.footerItemLink}>Политика конфиденциальности</Link>
                        </li>
                        <li className={styles.footerItem}>
                            <Link href={'/cookie-policy'} className={styles.footerItemLink}>Политика использования cookie</Link>
                        </li>
                    </ul>

                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.footerCopyright}>©2024 WEBCOS</p>
                    <ul className={styles.footerSocial}>
                        <li className={styles.footerSocialItem}>
                            <a href="#" className={styles.footerSocialLink}>
                                <Image className={styles.footerSocialIcon} src={TgWhiteIcon} alt={'Телеграмм'}/>

                            </a>
                        </li>
                        <li className={styles.footerSocialItem}>
                            <a href="#" className={styles.footerSocialLink}>
                                <Image className={styles.footerSocialIcon} src={VkWhiteIcon} alt={'ВК'}/>

                            </a>
                        </li>
                        <li className={styles.footerSocialItem}>
                            <a href="#" className={styles.footerSocialLink}>
                                <Image  className={styles.footerSocialIcon} src={DzenIcon} alt={'Дзен'}/>
                            </a>
                        </li>
                        <li className={styles.footerSocialItem}>
                            <a href="#" className={styles.footerSocialLink}>
                                <Image className={styles.footerSocialIcon} src={TiktokWhiteIcon} alt={'Тик-ток'}/>

                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}
