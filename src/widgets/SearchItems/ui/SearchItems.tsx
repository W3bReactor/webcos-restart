import styles from './SearchItems.module.css'
import React from "react";
import {ICategory} from "@/widgets/CategoriesSidebar";
interface ISearchItems {
    className?: string;
    setItem: (category: string, categoryId: number) => void
    data: {
        id: number;
        title: string
    }[];
}

export const SearchItems = ({className, setItem, data}: ISearchItems) => {
    return (
        <ul className={`${styles.searchItemsList} ${className ? className : ''}`}>
            {data.map(item =>
                <li key={item.id} className={styles.searchItemsItem}>
                    <button onClick={() => setItem(item.title, item.id)} className={styles.searchItemsBtn}>{item.title}</button>
                </li>
            )}
        </ul>
    );
}
