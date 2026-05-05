'use client'
import styles from './AdminSidebar.module.css'
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {CategoriesIcon} from "@/widgets/ArticleControls";

export const AdminSidebar = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div onClick={() => setOpen(!open)} className={styles.sidebarOpen}>
                <Image className={styles.sidebarOpenIcon} width={30} height={30} src={CategoriesIcon} alt={"Открыть сайдбар"}/>
            </div>

            <aside className={`${styles.adminSidebar} ${open ? styles.adminSidebarOpened : ""}`}>
                <h2 className={styles.adminSidebarTitle}>Админ-панель</h2>
                <ul className={styles.adminSidebarList}>
                    <li className={styles.adminSidebarItem}>
                        <h3 className={styles.adminSidebarName}>
                            <Link className={styles.adminSidebarLink} href={"/admin/main"}>
                                Главная
                            </Link>
                        </h3>
                    </li>
                    <li className={styles.adminSidebarItem}>
                        <h3 className={styles.adminSidebarName}>
                            <Link className={styles.adminSidebarLink} href={"/admin/articles"}>
                                Статьи
                            </Link>
                        </h3>
                    </li>
                    <li className={styles.adminSidebarItem}>
                        <h3 className={styles.adminSidebarName}>
                            <Link className={styles.adminSidebarLink} href={"/admin/projects"}>
                                Проекты
                            </Link>
                        </h3>
                    </li>
                    <li className={styles.adminSidebarItem}>
                        <h3 className={styles.adminSidebarName}>
                            <Link className={styles.adminSidebarLink} href={"/admin/story"}>
                                История
                            </Link>
                        </h3>
                    </li>
                    <li className={styles.adminSidebarItem}>
                        <h3 className={styles.adminSidebarName}>
                            <Link className={styles.adminSidebarLink} href={"/admin/categories"}>
                                Категории
                            </Link>
                        </h3>
                    </li>
                </ul>
            </aside>


        </>

    );
}
