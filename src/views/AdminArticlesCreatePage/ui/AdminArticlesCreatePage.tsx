'use client'
import styles from './AdminArticlesCreatePage.module.css'
import {Footer, Header, AdminSidebar, SearchItems, AdminArticleForm} from "@/widgets";

import {Input} from "@/shared/ui";
import {useEffect, useState} from "react";
import Link from "next/link";
import {PlusIcon} from "@/shared/assets";
import Image from "next/image";
import useSWR from "swr";
import {getCategoriesApi} from "@/widgets/CategoriesSidebar";
import {useDebounce} from "@/shared/lib";
import {createArticleApi, uploadImageArticleApi} from "@/widgets/Blog/api/articlesApi";
import useSWRMutation from "swr/mutation";
import {ArticleCreate, ArticleUploadImage} from "@/widgets/Blog/api/types";
import {ApiResult} from "@/shared/model";
import {IArticle} from "@/widgets/Blog";
import {redirect} from "next/navigation";
import {getArticleApi} from "@/widgets/Article";



export const AdminArticlesCreatePage = () => {

    const [debouncedValueCategory, valueCategory, setValueCategory] = useDebounce('', 1000)
    const [data, setData] = useState({
        title: '',
        description: '',
        categoryId: -1
    })
    const [debouncedValueContent, _valueContent, setValueContent] = useDebounce('', 1000)
    const [image, setImage] = useState<File | null>(null)
    const [url, setUrl] = useState('')


    const { data: responseCreate, trigger: createArticle } = useSWRMutation<
        ApiResult<IArticle>,
        Error,
        "articles/create",
        ArticleCreate
    >(
        "articles/create",
        (_, { arg }) => createArticleApi(arg)
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



    const { data: responseCategory, mutate } = useSWR(
        ["categories", debouncedValueCategory],
        async () => await getCategoriesApi({size: 3, search: debouncedValueCategory})
    )

    const onUpdateData = async (val: string, categoryId: number) => {
        setValueCategory(val)
        setData({...data, categoryId})
    }
    useEffect(() => {
        if(responseCreate?.success && responseCreate.data.id && image) {
            const FD = new FormData();
            FD.append('file', image);
            uploadArticle({articleId: responseCreate.data.id, body: FD})
        }
        if(responseCreate?.success) {
            redirect(`/blog/${responseCreate.data.id}`)
        }
    }, [responseCreate]);


    const onCreate = async () => {
        await createArticle(
            {
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
                        <h1 className={styles.adminCreateTitle}>Создание статьи</h1>
                        <div className={styles.adminCreateContent}>
                            <div className={styles.adminCreateSearchWrapper}>
                                <div className={styles.adminCreateSearch}>
                                    <Input placeholder={'Найти категорию...'} value={valueCategory} setValue={setValueCategory}/>
                                    {debouncedValueCategory.length > 0 && responseCategory?.success && responseCategory.data.content.length > 0 &&
                                        <SearchItems data={responseCategory.data.content} setItem={onUpdateData} className={styles.adminCreateSearchItems}/>
                                    }
                                </div>
                                <Link className={styles.adminCreateAdd} href={'/admin/categories'}>
                                    <Image src={PlusIcon} alt={'Добавить категорию'}/>
                                </Link>
                            </div>
                        </div>
                        <AdminArticleForm type={"create"} setUrl={setUrl} url={url} image={image} setImage={setImage} onSend={onCreate} data={data} setData={setData} setValue={setValueContent} debouncedValue={debouncedValueContent}/>
                    </div>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
