import styles from './StandardBtn.module.css'
import React from "react";
import Link from "next/link";

interface IStandardBtn {
    children: React.ReactNode
    className?: string;
    type: 'site-link' | 'btn' | 'link'
    href?: string;
    target?: string
    onClick?: () => void;
    disabled?: boolean;
}

export const StandardBtn = ({children, className, type, href, target, onClick, disabled = false}: IStandardBtn) => {
    return (
        <>
            {type === 'btn' &&
                <button disabled={disabled} onClick={onClick}  className={`${styles.btn} ${className ? className : ''}`}>
                    {children}
                </button>
            }
            {type === 'site-link' &&
                <Link href={href ? href : ''} className={`${styles.btn} ${className ? className : ''}`}>
                    {children}
                </Link>
            }
            { type === 'link' &&
                <a target={target} href={href ? href : ''} className={`${styles.btn} ${className ? className : ''}`}>
                    {children}
                </a>
            }
        </>

    );
}
