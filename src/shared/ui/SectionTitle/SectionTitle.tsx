import React from "react";
import styles from './SectionTitle.module.css'


interface ISectionTitle {
    children: React.ReactNode;
    className?: string;
}
export const SectionTitle = ({children, className}: ISectionTitle) => {
    return (
        <h2 className={`${styles.sectionTitle} ${className ? className : ''}`}>
            {children}
        </h2>
    );
}
