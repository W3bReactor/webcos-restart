import styles from './PurpleBtn.module.css'
import React from "react";
import Link from "next/link";
interface IPurpleBtn {
    children: React.ReactNode
    className?: string;
    type: 'site-link' | 'btn' | 'link'
    href?: string;
    target?: string
    btnType?: "submit" | "reset" | "button"
    onClick?: () => void;
}

export const PurpleBtn = ({children, className, type, href, target, btnType, onClick}: IPurpleBtn) => {
    return (
        <>
            {type === 'btn' &&
                <button onClick={onClick} type={btnType} className={`${styles.btn} ${className ? className : ''}`}>
                    {children}
                </button>
            }
            {type === 'site-link' &&
                <Link href={href ? href : ''} className={`${styles.btn} ${className ? className : ''}`}>
                    {children}
                </Link>
            }
            { type === 'link' &&
                <a onClick={onClick} target={target} href={href ? href : ''} className={`${styles.btn} ${className ? className : ''}`}>
                    {children}
                </a>
            }
        </>

    );
}
