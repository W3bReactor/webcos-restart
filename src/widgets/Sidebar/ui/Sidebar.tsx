import styles from './Sidebar.module.css'
import React from "react";
import {getArticlesApi} from "@/widgets/Blog";
import Link from "next/link";

interface ISidebar {
    className?: string;
}

export const Sidebar = async ({className}: ISidebar) => {
    const response = await getArticlesApi({sortBy: "views", order: "desc", size: 3})
    if(!response.success || response.data.content.length <= 0) {
        return <aside className={`${styles.sidebar} ${className ? className : ''}`}></aside>
    }
    return (
        <aside className={`${styles.sidebar} ${className ? className : ''}`}>
            <h2 className={styles.sidebarTitle}>Лучшее</h2>
            <ul className={styles.sidebarList}>
                {response.data.content.map((article) =>
                    <li key={article.id} className={styles.sidebarItem}>
                        <h3 className={styles.sidebarName}>
                            <Link className={styles.sidebarLink} href={`/blog/${article.id}-${article.slug}`}>
                                {article.title}
                            </Link>
                        </h3>
                    </li>
                )}
            </ul>
        </aside>

    );
}
