'use client'
import styles from './ArticleSort.module.css'
import Image from "next/image";
import React, { useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {BigDropdownIcon} from "@/shared/assets";


const sorting: { [key: string]: { sortBy: string; order: string } } = {
    'Новые': {
        sortBy: 'createdAt',
        order: 'desc'
    },
    'Лучшее': {
        sortBy: 'title',
        order: 'asc'
    },
    'Популярное': {
        sortBy: 'id',
        order: 'asc'
    }
}



export const ArticleSort = () => {
    const [selected, setSelected] = useState('Новые')
    const [openDropdown, setOpenDropdown] = useState(false)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        const html = document.querySelector('html')
        if(html) {
            html.setAttribute('data-categories', "close")
        }

    }, [pathname])



    const onClickOption = (e: React.MouseEvent<HTMLElement>) => {
        const params = new URLSearchParams(searchParams || "");
        params.set('sort', sorting[e.currentTarget.innerText].sortBy);
        params.set('order', sorting[e.currentTarget.innerText].order);
        router.push(`${pathname}?${params.toString()}`);

        setSelected(e.currentTarget.innerText)
        setOpenDropdown(false)
    }

    return (
                <fieldset className={styles.articlesItemFieldSet}>
                    <legend className={styles.articlesItemLegend}>SORT BY</legend>
                    <div onClick={() => setOpenDropdown(!openDropdown)} className={styles.articlesItemSelected}>{selected} <Image className={styles.articlesItemDropdown} src={BigDropdownIcon} alt={'Ещё'}/></div>
                    {openDropdown &&
                        <ul className={styles.articlesItemOptions}>
                            <li className={styles.articlesItemOption} onClick={onClickOption}>Новые</li>
                            <li className={styles.articlesItemOption} onClick={onClickOption}>Лучшее</li>
                            <li className={styles.articlesItemOption} onClick={onClickOption}>Популярное</li>
                        </ul>

                    }
                </fieldset>
    );
}
