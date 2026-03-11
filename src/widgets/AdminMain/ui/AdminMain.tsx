'use client'
import React from "react";
import styles from './AdminMain.module.css'

export const AdminMain = () => {

    return (
        <div className={styles.adminMainColumn}>
            <h1 className={styles.adminMainTitle}>Главная</h1>
            <div className={styles.adminMainContent}>
                <ul className={styles.adminMainList}>
                    <li className={styles.adminMainItem}>
                        <p className={styles.adminMainDesc}>Кол-во статей: 100</p>
                    </li>
                    <li className={styles.adminMainItem}>
                        <p className={styles.adminMainDesc}>Кол-во продуктов: 100</p>
                    </li>
                    <li className={styles.adminMainItem}>
                        <p className={styles.adminMainDesc}>Кол-во категорий: 100</p>
                    </li>
                    <li className={styles.adminMainItem}>
                        <p className={styles.adminMainDesc}>Кол-во историй: 100</p>
                    </li>
                </ul>
            </div>
        </div>

    );
}
