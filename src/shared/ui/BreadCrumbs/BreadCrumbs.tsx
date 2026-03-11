import styles from './BreadCrumbs.module.css'
import Link from "next/link";
import Image from "next/image";
import React from "react";
import {HomeIcon} from "@/shared/assets";
interface IBreadCrumbs {
    items: {
        label: string;
        path: string;
    }[]
}
export const BreadCrumbs = ({items}: IBreadCrumbs) => {
    return (
        <div className={styles.BreadCrumbs}>
            <Link href={'/'} className={styles.BreadCrumbsItem}><Image alt={'Главная'} src={HomeIcon}/></Link>
            {items.map((el, id) => {
                    if(id !== items.length - 1) {
                        return <div className={styles.BreadCrumbsItemWrapper} key={id}>
                            <Link href={el.path} className={styles.BreadCrumbsItem}>{el.label}</Link>
                            <p className={styles.BreadCrumbsItem}>»</p>
                        </div>

                    } else {
                        return <h1 key={id} className={styles.BreadCrumbsItem}>{el.label}</h1>
                    }
                }
            )}

        </div>
    );
}
