import styles from './CardDesc.module.css'
import React from "react";


interface ICardDesc{
    children: React.ReactNode;
    className?: string;
}
export const CardDesc = ({children, className}: ICardDesc) => {
    return (
        <p className={`${styles.cardDesc} ${className ? className : ''}`}>
            {children}
        </p>
    );
}
