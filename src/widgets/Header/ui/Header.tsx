import Image from "next/image";

import styles from './Header.module.css'
import Link from "next/link";
import {ThemeToggle} from "@/shared/ui";
import {Burger} from "./Burger/Burger";
import {DropdownBlackIcon, DropdownIcon, LogoBlackIcon, LogoIcon} from "@/shared/assets";


export const   Header = () => {
    return (
        <header data-on-open-burger='header' className={`${styles.header} `}>
            <Link data-on-open-burger='logo' className={`${styles.headerLogo} `} href={'/'} >
                <Image data-hide-on-theme="dark" alt={'Логотип'} src={LogoBlackIcon} className={styles.navImage}/>
                <Image data-hide-on-theme="light" alt={'Логотип'} src={LogoIcon} className={styles.navImage}/>
            </Link>
            <nav data-on-open-burger='nav' className={`${styles.nav} `}>
                <ul data-on-open-burger="nav-list" className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link href={'/projects'} className={styles.navLink} >Проекты</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link href={'/developers'} className={styles.navLink}>Разработчики</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link className={styles.navLink}  href={'/blog'}>Блог
                            <div data-hide-on-theme="dark">
                                <Image alt={'Ещё'} src={DropdownBlackIcon} className={styles.navImage}/>
                            </div>
                            <div data-hide-on-theme="light">
                                <Image alt={'Ещё'} src={DropdownIcon} className={styles.navImage}/>
                            </div>
                        </Link>
                        <div data-on-open-burger='dropdown-wrapper' className={styles.navDropdownWrapper} >
                            <ul data-on-open-burger='dropdown'  className={`${styles.navDropdown} ${styles.navDropdownOpen}`}>
                                <li className={styles.navDropdownItem}>
                                    <Link href={'/blog/all'} className={styles.navDropdownItemLink}>Все статьи</Link>
                                </li>
                                {/*<li className={styles.navDropdownItem}>*/}
                                {/*    <Link className={styles.navDropdownItemLink} href={'/blog/feed'}>Моя лента</Link>*/}
                                {/*</li>*/}

                            </ul>

                        </div>
                    </li>
                </ul>
            </nav>
            <ThemeToggle className={`${styles.headerThemeChange}`}/>
            <Burger/>
        </header>
    );
}
