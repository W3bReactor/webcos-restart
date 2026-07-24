'use client'
import styles from './CategorySearch.module.css'
import React, {useEffect, useState} from "react";
import {useDebounce} from "@/shared/lib";
import {RoundedInput} from "@/shared/ui";
import {SearchItems} from "@/widgets";
import useSWR from "swr";
import {getCategoriesApi} from "@/widgets/CategoriesSidebar";


interface CategoryField {
    id: string;
    categoryId: number | null;
    title: string;
}

interface ICategorySearch {
    field: CategoryField;

    onChange(field: CategoryField): void;
}


export const CategorySearch = ({
                                   field,
                                   onChange,
                               }: ICategorySearch) => {
    const [debouncedValue, value, setValue] =
        useDebounce(field.title, 500);

    const [show, setShow] = useState(false);

    const { data: responseCategories } = useSWR(
        ["categories", debouncedValue],
        ([, search]) =>
            getCategoriesApi({
                size: 3,
                search,
            })
    );

    useEffect(() => {
        setValue(field.title);
    }, [field.title]);

    useEffect(() => {
        if (debouncedValue.length > 0 && responseCategories?.success && responseCategories.data.content.length > 0 && (responseCategories.data.content[0].title !== debouncedValue)) {
            setShow(true);
        } else {
            setShow(false)
        }
    }, [debouncedValue, responseCategories]);


    const selectCategory = (title: string, categoryId: number) => {

        onChange({
            ...field,
            title,
            categoryId,
        });

        setValue(title);
    };


    return (
        <div className={styles.adminCreateSearch}>
            <RoundedInput className={styles.adminCreateInput} placeholder={'Найти категорию...'} value={value}
                          setValue={setValue}/>
            {show && responseCategories && responseCategories.success &&
                <SearchItems
                    data={responseCategories.data.content}
                    setItem={selectCategory}
                    className={styles.adminCreateSearchItems}
                />
            }
        </div>
    );
}
