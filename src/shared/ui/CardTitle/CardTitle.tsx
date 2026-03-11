import styles from './CardTitle.module.css'
import React from "react";


interface ICardTitle {
    children: React.ReactNode;
    className?: string;
}
export const CardTitle = ({children, className}: ICardTitle) => {
    return (
        <h3 className={`${styles.cardTitle} ${className ? className : ''}`}>
            {children}
        </h3>
    );
}
