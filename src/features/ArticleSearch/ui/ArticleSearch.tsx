'use client'
import styles from './ArticleSearch.module.css'
import Image from "next/image";
import React, { useEffect} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {SearchIcon} from "@/features/ArticleSearch";
import {useDebounce} from "@/shared/lib";
import {CloseIcon} from "@/shared/assets";


interface IArticleControls{
    currentSearch: string
}

export const ArticleSearch = ({currentSearch}: IArticleControls) => {
    const [debouncedValue, value, setValue] = useDebounce(currentSearch, 300)
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();


    const onUpdateData = async (val: string) => {
        setValue(val)
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams || "");
        params.set('search', debouncedValue);
        router.push(`${pathname}?${params.toString()}`);
    }, [debouncedValue, pathname, router, searchParams]);



    const onClearSearch = () => {
        setValue('')
        const params = new URLSearchParams(searchParams || "");
        params.set('search', '');
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
            <div className={styles.articlesItemSearch}>
                <Image src={SearchIcon} alt={'Поиск'} className={styles.articlesItemSearchIcon}/>
                <input value={value} onInput={(e) => onUpdateData(e.currentTarget.value)} placeholder={'Поиск...'} type="text" className={styles.articlesItemInput}/>
                {value.length > 0 &&
                    <Image src={CloseIcon} alt={'Стереть'} onClick={onClearSearch} className={styles.articlesItemCloseIcon}/>
                }
            </div>
    );
}
