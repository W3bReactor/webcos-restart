'use client'
import styles from './AdminSidebar.module.css'
import React from "react";
import Link from "next/link";

export const AdminSidebar = () => {
    return (
        <aside className={styles.adminSidebar}>
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

    );
}
