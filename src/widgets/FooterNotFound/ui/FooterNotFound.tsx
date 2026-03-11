import styles from './FooterNotFound.module.css'
import Image from "next/image";
import React from "react";
import {DzenBlackIcon, DzenIcon, LogoBlackIcon, LogoIcon, TgIcon, TiktokIcon, VkIcon} from "@/shared/assets";
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
                            <Link href={'#roadmap'} className={styles.footerItemLink}>Наш путь</Link>
                        </li>

                    </ul>
                    {/* Оставляю для стилей*/}
                    <ul className={styles.footerList}>
                    </ul>

                </div>

                <div className={styles.footerBottom}>
                    <p className={styles.footerCopyright}>©2024 WEBCOS</p>
                    <ul className={styles.footerSocial}>
                        <li className={styles.footerSocialItem}>
                            <a href="#" className={styles.footerSocialLink}>
                                <Image className={styles.footerSocialIcon} src={TgIcon} alt={'Телеграмм'}/>

                            </a>
                        </li>
                        <li className={styles.footerSocialItem}>
                            <a href="#" className={styles.footerSocialLink}>
                                <Image className={styles.footerSocialIcon} src={VkIcon} alt={'ВК'}/>

                            </a>
                        </li>
                        <li className={styles.footerSocialItem}>
                            <a href="#" className={styles.footerSocialLink}>
                                <Image data-hide-on-theme="light" className={styles.footerSocialIcon} src={DzenIcon} alt={'Дзен'}/>
                                <Image data-hide-on-theme="dark" className={styles.footerSocialIcon} src={DzenBlackIcon} alt={'Дзен'}/>

                            </a>
                        </li>
                        <li className={styles.footerSocialItem}>
                            <a href="#" className={styles.footerSocialLink}>
                                <Image className={styles.footerSocialIcon} src={TiktokIcon} alt={'Тик-ток'}/>

                            </a>
                        </li>
                    </ul>
                </div>

            </div>
        </footer>
    );
}
