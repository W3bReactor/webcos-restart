"use client"
import styles from './CategoriesSidebarClient.module.css'
import React from "react";
import Image from "next/image";
import {MoonIcon} from "@/shared/assets";
import {getCategoriesApi} from "@/widgets/CategoriesSidebar/api/categoriesApi";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import {ICategory} from "@/widgets/CategoriesSidebar";
import {ApiResult, PageResponse} from "@/shared/model";

interface ICategoriesSidebar {
    className?: string;
    initialCategories: ICategory[];
}

const PAGE_SIZE = 1;

export const CategoriesSidebarClient = ({className, initialCategories}: ICategoriesSidebar) => {
    const getKey = (
        pageIndex: number,
        previousPageData: ApiResult<PageResponse<ICategory>> | null
    ) => {

        if (
            previousPageData && previousPageData.success &&
            pageIndex >= previousPageData.data.totalPages
        ) {
            return null
        }

        return { page: pageIndex, size: PAGE_SIZE }
    }
    const { data, size, setSize, isLoading } = useSWRInfinite(
        getKey,
        ({ page, size }) => getCategoriesApi({ page, size }),
        {
            fallbackData: [
                {
                    success: true,
                    data: {
                        content: initialCategories,
                        totalElements: initialCategories.length,
                        totalPages: 1,
                        page: 0,
                        size: PAGE_SIZE
                    }
                }
            ]
        }
    );

    const categories = data
        ?.flatMap(page => page.success ? page.data.content : []) ?? [];

    const last = (data && data[data.length-1]) ? data[data.length-1] : false;
    const isLast = last && last.success && last.data ? last.data.totalPages - 1 === last.data.page : false;
    return (
        <aside data-on-open-categories='sidebar' className={`${styles.sidebar} ${className ? className : ''}`}>
            <h2 className={styles.sidebarTitle}>Категории</h2>
            <ul className={styles.sidebarList}>
                {categories.length > 0 ?
                    <>
                        {
                            categories.map((category) =>
                                <li key={category.id} className={styles.sidebarItem}>
                                    <Link className={styles.sidebarLink} href={`/blog/category/${category.id}-${category.slug}`}>
                                        {category.icon ?
                                            <Image width={34} height={34} src={category.icon} alt={category.title}/>
                                            :
                                            <Image width={34} height={34} src={MoonIcon} alt={category.title}/>
                                        }
                                        <h3 className={styles.sidebarName}>
                                            {category.title}
                                        </h3>
                                    </Link>
                                </li>
                            )
                        }
                        {!isLast &&
                            <li className={styles.sidebarItem}>
                                <button disabled={isLoading} className={`${styles.sidebarBtn}`} onClick={() => setSize(size + 1)}>
                                    Смотреть ещё
                                </button>
                            </li>
                        }
                    </>
                    :
                    <p>Ничего не найдено :(</p>
                }

            </ul>
        </aside>

    );
}
