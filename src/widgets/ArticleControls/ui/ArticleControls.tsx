'use client'
import styles from './ArticleControls.module.css'
import Image from "next/image";
import React, { useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {ArticleSort} from "@/features/ArticleSort";
import {CategoriesBlackIcon, CategoriesIcon} from "@/widgets/ArticleControls";
import {ArticleSearch} from "@/features/ArticleSearch";



interface IArticleControls {
    currentSearch: string
}

export const ArticleControls = ({currentSearch}: IArticleControls) => {
    const [openCategories, setOpenCategories] = useState(false)
    const pathname = usePathname();

    useEffect(() => {
        const html = document.querySelector('html')
        if(html) {
            html.setAttribute('data-categories', "close")
        }

    }, [pathname])

    const onClickCategories = () => {
        const html = document.querySelector('html')
        if(html) {
            if(openCategories) {
                html.setAttribute('data-categories', "close")

            } else {
                html.setAttribute('data-categories', "open")
            }
        }
        setOpenCategories(!openCategories)
    }

    const onClickWindow = (e: DocumentEventMap["mousedown"]) => {
        const item = document.querySelector("[data-on-open-categories='sidebar']")
        if (!item?.contains(e.target as Node | null)) {
            setOpenCategories(false)
            const html = document.querySelector('html')
            if(html) {
                html.setAttribute('data-categories', "close")
            }

        }
    }

    useEffect(()=>{
        document.addEventListener('mousedown', onClickWindow )
        return()=> document.removeEventListener('mousedown', onClickWindow)
    }, [])

    return (
        <div className={styles.articlesItemTop}>
            <div className={styles.articlesInstruments}>
                <ArticleSort/>
                <button onClick={onClickCategories} className={styles.articlesSidebarBtn}>
                    <Image data-hide-on-theme="light" alt={'Категории'} className={styles.articlesSidebarCategories} src={CategoriesIcon}/>
                    <Image data-hide-on-theme="dark" alt={'Категории'} className={styles.articlesSidebarCategories} src={CategoriesBlackIcon}/>
                </button>
            </div>
            <ArticleSearch currentSearch={currentSearch}/>
        </div>
    );
}
