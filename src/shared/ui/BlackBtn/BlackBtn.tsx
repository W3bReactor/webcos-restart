import styles from './BlackBtn.module.css'
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface IContactsBtn {
    children: React.ReactNode
    className?: string;
    type: 'site-link' | 'btn' | 'link'
    href?: string;
    target?: string
    srcImage?: string
}

export const BlackBtn = ({children, className, type, href, target, srcImage}: IContactsBtn) => {
    return (
        <>
            {type === 'btn' &&
                <button  className={`${styles.link} ${className ? className : ''}`}>
                    {srcImage &&
                        <Image width={30} height={30} className={styles.linkIcon} src={srcImage} alt={'Телеграм'}/>
                    }
                    <span>
                        {children}
                    </span>
                </button>
            }
            {type === 'site-link' &&
                <Link href={href ? href : ''} className={`${styles.link} ${className ? className : ''}`}>
                    {srcImage &&
                        <Image width={30} height={30} className={styles.linkIcon} src={srcImage} alt={'Телеграм'}/>
                    }
                    <span>
                        {children}
                    </span>
                </Link>
            }
            { type === 'link' &&
                <a target={target} href={href ? href : ''}  className={`${styles.link} ${className ? className : ''}`}>
                    {srcImage &&
                        <Image width={30} height={30} className={styles.linkIcon} src={srcImage} alt={'Телеграм'}/>
                    }
                    <span>
                        {children}
                    </span>
                </a>
            }

        </>
    );
}
