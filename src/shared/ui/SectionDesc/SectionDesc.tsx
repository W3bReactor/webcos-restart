import styles from './SectionDesc.module.css'
import React from "react";


interface ISectionDesc {
    children: React.ReactNode;
    className?: string;
}
export const SectionDesc = ({children, className}: ISectionDesc) => {
    return (
        <p className={`${styles.sectionDesc} ${className ? className : ''}`}>
            {children}
        </p>
    );
}
