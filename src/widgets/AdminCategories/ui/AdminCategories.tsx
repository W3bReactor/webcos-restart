'use client'
import React, {useEffect, useState} from "react";
import styles from './AdminCategories.module.css'
import {Input, PurpleBtn, RedBtn, Upload} from "@/shared/ui";
import {useDebounce} from "@/shared/lib";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {deleteProjectApi} from "@/widgets/Projects/api/projectsApi";
import useSWR from "swr";
import {getProjectsApi} from "@/widgets/Projects";
import {getCategoriesApi, ICategory} from "@/widgets/CategoriesSidebar";
import {redirect} from "next/navigation";
import {CategoryCreate, CategoryUploadImage} from "@/widgets/CategoriesSidebar/api/types";
import {
    createCategoryApi,
    deleteCategoryApi,
    uploadImageCategoryApi
} from "@/widgets/CategoriesSidebar/api/categoriesApi";
import {ArticleUploadImage} from "@/widgets/Blog/api/types";
import {uploadImageArticleApi} from "@/widgets/Blog/api/articlesApi";
import {SearchItems} from "@/widgets";

export const AdminCategories = () => {
    const [debouncedValueDeleteCategory, valueDeleteCategory, setValueDeleteCategory] = useDebounce('', 1000)

    const [data, setData] = useState({
        categoryCreateId: -1,
        categoryDeleteId: -1,
        title: '',
        description: '',

    })
    const [image, setImage] = useState<File | null>(null)
    const [url, setUrl] = useState('')

    const onDeleteData = async (val: string, categoryDeleteId: number) => {
        setValueDeleteCategory(val)
        setData({...data, categoryDeleteId})
    }

    const { data: responseDelete,  trigger: deleteCategory} = useSWRMutation<
        ApiResult<string>,
        Error,
        "categories/delete",
        number
    >(
        "categories/delete",
        (_, { arg }) => deleteCategoryApi(arg)
    )

    const { data: responseCreate,  trigger: createCategory} = useSWRMutation<
        ApiResult<ICategory>,
        Error,
        "categories/create",
        CategoryCreate
    >(
        "categories/create",
        (_, { arg }) => createCategoryApi(arg)
    )


    const { data: responseUpload, trigger: uploadCategory } = useSWRMutation<
        ApiResult<string>,
        Error,
        "categories/upload/image",
        CategoryUploadImage
    >(
        "categories/upload/image",
        (_, { arg }) => uploadImageCategoryApi(arg)
    )

    const onDeleteCategory = async () => {
        await deleteCategory(data.categoryDeleteId);
    }

    const { data: responseDeleteCategory } = useSWR(
        ["categories", debouncedValueDeleteCategory],
        async () => await getCategoriesApi({size: 3, search: debouncedValueDeleteCategory})
    )

    const onCreate = async () => {
        await createCategory(
            {
                description: data.description,
                title: data.title
            }
        )

    }

    useEffect(() => {
        if(responseCreate?.success && responseCreate.data.id && image) {
            const FD = new FormData();
            FD.append('file', image);
            uploadCategory({categoryId: responseCreate.data.id, body: FD})
        }
        if(responseCreate?.success) {
            redirect(`/blog/category/${responseCreate.data.id}`);
        }
    }, [responseCreate]);


    return (
        <div className={styles.adminCategoriesColumn}>
            <h1 className={styles.adminCategoriesTitle}>Категории</h1>
            <div className={styles.adminCategoriesContent}>
                <div className={styles.adminCategoriesSearch}>
                    <Upload url={url} setUrl={setUrl} image={image} setImage={setImage}/>
                    <Input className={styles.adminCategoriesSearchInput} placeholder={'Название'} value={data.title} setValue={(value) =>  setData({...data, title: value})}/>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData({...data, description: e.target.value})}
                        placeholder={'Описание'}
                        className={styles.adminTextarea}
                    />

                    <PurpleBtn onClick={onCreate} className={styles.adminCategoriesSearchBtn} type={'btn'}>Добавить</PurpleBtn>
                </div>
                <div className={styles.adminCategoriesSearch}>
                    <Input className={styles.adminCategoriesSearchInput} placeholder={'Найти...'} value={valueDeleteCategory} setValue={setValueDeleteCategory}/>
                    {debouncedValueDeleteCategory.length > 0 && responseDeleteCategory?.success && responseDeleteCategory.data.content.length > 0 &&
                        <SearchItems data={responseDeleteCategory.data.content} setItem={onDeleteData} className={styles.adminEditSearchItems}/>
                    }
                    <RedBtn onClick={onDeleteCategory} className={styles.adminCategoriesSearchBtn} type={'btn'}>Удалить</RedBtn>
                </div>
            </div>
        </div>

    );
}
