'use client'
import styles from './AdminArticlesEditPage.module.css'
import {Footer, Header, AdminSidebar, SearchItems, AdminArticleForm} from "@/widgets";

import {Input} from "@/shared/ui";
import {useEffect, useState} from "react";
import Link from "next/link";
import {PlusIcon} from "@/shared/assets";
import Image from "next/image";
import {useDebounce} from "@/shared/lib";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {IArticle} from "@/widgets/Blog";
import {ArticleUpdate, ArticleUploadImage} from "@/widgets/Blog/api/types";
import { updateArticleApi, uploadImageArticleApi} from "@/widgets/Blog/api/articlesApi";
import useSWR from "swr";
import {getCategoriesApi} from "@/widgets/CategoriesSidebar";
import {redirect} from "next/navigation";
import {toInteger} from "es-toolkit/compat";
import {getArticleApi} from "@/widgets/Article";
import {getCategoryApi} from "@/views/BlogAllPage";


interface IAdminArticlesEditPage {
    articleId: string
}
export const AdminArticlesEditPage = ({articleId}: IAdminArticlesEditPage) => {
    const [debouncedValueCategory, valueCategory, setValueCategory] = useDebounce('', 1000)
    const [data, setData] = useState({
        title: '',
        description: '',
        categoryId: -1
    })
    const [debouncedValueContent, _valueContent, setValueContent] = useDebounce('', 1000)
    const [image, setImage] = useState<File | null>(null)
    const [url, setUrl] = useState('')



    const { data: responseUpdate, trigger: updateArticle } = useSWRMutation<
        ApiResult<IArticle>,
        Error,
        "articles/edit",
        ArticleUpdate
    >(
        "articles/edit",
        (_, { arg }) => updateArticleApi(arg)
    )


    const { data: responseUpload, trigger: uploadArticle } = useSWRMutation<
        ApiResult<string>,
        Error,
        "articles/upload/image",
        ArticleUploadImage
    >(
        "articles/upload/image",
        (_, { arg }) => uploadImageArticleApi(arg)
    )


    const { data: responseArticle } = useSWR(
        ["article"],
        async () => await getArticleApi(articleId)
    )

    const { data: responseCategory } = useSWR(
        ["category", data.categoryId],
        async () => await getCategoryApi(String(data.categoryId))
    )



    const { data: responseCategories } = useSWR(
        ["categories", debouncedValueCategory],
        async () => await getCategoriesApi({size: 3, search: debouncedValueCategory})
    )

    const onUpdateData = async (val: string, categoryId: number) => {
        setValueCategory(val)
        setData({...data, categoryId})
    }
    useEffect(() => {
        if(responseUpdate?.success && responseUpdate.data.id && image != null) {
            console.log(image)
            const FD = new FormData();
            FD.append('file', image);
            uploadArticle({articleId: responseUpdate.data.id, body: FD})
        }
        if(responseUpdate?.success) {
            redirect(`/blog/${responseUpdate.data.id}`)
        }

    }, [responseUpdate]);


    useEffect(() => {
        if(responseArticle?.success) {
            setData({
                title: responseArticle.data.title,
                categoryId: responseArticle.data.category_id,
                description: responseArticle.data.description,
            })
            setUrl(responseArticle.data.image);
            setValueContent(responseArticle.data.content);
        }
        if(responseCategory?.success) {
            setValueCategory(responseCategory.data.title);
        }
    }, [responseCategory, responseArticle]);

    console.log(debouncedValueContent)
    const onEdit = async () => {
        await updateArticle(
            {
                id: toInteger(articleId),
                content: debouncedValueContent,
                description: data.description,
                title: data.title,
                category_id: data.categoryId
            }
        )

    }
    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.adminCreateWrapper}>
                    <AdminSidebar/>
                    <div className={styles.adminCreateColumn}>
                        <h1 className={styles.adminCreateTitle}>Редактирование статьи</h1>
                        <div className={styles.adminCreateContent}>
                            <div className={styles.adminCreateSearchWrapper}>
                                <div className={styles.adminCreateSearch}>
                                    <Input placeholder={'Найти категорию...'} value={valueCategory} setValue={setValueCategory}/>
                                    {debouncedValueCategory.length > 0 && responseCategories?.success && responseCategories.data.content.length > 0 &&
                                        <SearchItems data={responseCategories.data.content} setItem={onUpdateData} className={styles.adminCreateSearchItems}/>
                                    }
                                </div>
                                <Link className={styles.adminCreateAdd} href={'/admin/categories'}>
                                    <Image src={PlusIcon} alt={'Добавить категорию'}/>
                                </Link>
                            </div>
                            <AdminArticleForm type={"edit"} url={url} setUrl={setUrl} image={image} setImage={setImage} onSend={onEdit} data={data} setData={setData} setValue={setValueContent} debouncedValue={debouncedValueContent}/>
                        </div>
                    </div>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
