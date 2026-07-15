'use client'
import styles from './AdminArticlesEditPage.module.css'
import {Footer, Header, AdminSidebar, SearchItems, AdminArticleForm} from "@/widgets";

import {RoundedInput} from "@/shared/ui";
import {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {PlusIcon} from "@/shared/assets";
import Image from "next/image";
import {useDebounce} from "@/shared/lib";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {IArticle} from "@/widgets/Blog";
import {ArticleUpdate, ArticleUploadImage} from "@/widgets/Blog/api/types";
import {updateArticleApi, uploadImageArticleApi} from "@/widgets/Blog/api/articlesApi";
import useSWR from "swr";
import {getCategoriesApi} from "@/widgets/CategoriesSidebar";
import {redirect} from "next/navigation";
import {toInteger} from "es-toolkit/compat";
import {getArticleApi} from "@/widgets/Article";
import {getCategoryApi} from "@/pages/BlogAllPage";
import {JSONContent} from "@tiptap/core";
import {CategorySearch} from "@/features/CategorySearch";


interface IAdminArticlesEditPage {
    articleId: string
}

interface CategoryField {
    id: string;
    categoryId: number | null;
    title: string;
}

interface FormData {
    title: string;
    description: string;
    categories: CategoryField[];
}

export const AdminArticlesEditPage = ({articleId}: IAdminArticlesEditPage) => {
    const [data, setData] = useState<FormData>({
        title: "",
        description: "",
        categories: [{
            id: crypto.randomUUID(),
            categoryId: null,
            title: "",
        }],
    });

    const [debouncedValueContent, _valueContent, setValueContent] = useDebounce<JSONContent>({
        "type": "doc",
        content: []
    }, 1000)
    const [image, setImage] = useState<File | null>(null)
    const [url, setUrl] = useState('')


    const {data: responseUpdate, trigger: updateArticle} = useSWRMutation<
        ApiResult<IArticle>,
        Error,
        "articles/edit",
        ArticleUpdate
    >(
        "articles/edit",
        (_, {arg}) => updateArticleApi(arg)
    )


    const {trigger: uploadArticle} = useSWRMutation<
        ApiResult<string>,
        Error,
        "articles/upload/image",
        ArticleUploadImage
    >(
        "articles/upload/image",
        (_, {arg}) => uploadImageArticleApi(arg)
    )


    const {data: responseArticle} = useSWR(
        ["article", articleId],
        () => getArticleApi(articleId),
        {
            revalidateOnFocus: false,
        }
    )

    useEffect(() => {
        if (responseUpdate?.success && responseUpdate.data.id && image != null) {
            const FD = new FormData();
            FD.append('file', image);
            uploadArticle({articleId: responseUpdate.data.id, body: FD})
        }
        if (responseUpdate?.success) {
            redirect(`/blog/${responseUpdate.data.id}`)
        }

    }, [responseUpdate, image, uploadArticle]);


    useEffect(() => {
        if (responseArticle?.success) {
            setData({
                title: responseArticle.data.title,
                description: responseArticle.data.description,
                categories:
                    responseArticle.data.category_ids.length > 0
                        ? responseArticle.data.category_ids.map(id => ({
                            id: crypto.randomUUID(),
                            categoryId: id,
                            title: "",
                        }))
                        : [
                            {
                                id: crypto.randomUUID(),
                                categoryId: null,
                                title: "",
                            },
                        ],
            });
            setUrl(responseArticle.data.image);
            setValueContent(responseArticle.data.content);
        }
    }, [responseArticle, setValueContent]);


    const onEdit = async () => {
        await updateArticle(
            {
                id: toInteger(articleId),
                content: debouncedValueContent,
                description: data.description,
                title: data.title,
                category_ids: data.categories.map(cat => Number(cat.categoryId))
            }
        )

    }

    const onClickAdd = () => {
        setData(prev => ({
            ...prev,
            categories: [
                ...prev.categories,
                {
                    id: crypto.randomUUID(),
                    categoryId: null,
                    title: "",
                },
            ],
        }));
    };

    const removeCategory = (id: string) => {
        setData(prev => ({
            ...prev,
            categories: prev.categories.filter(x => x.id !== id),
        }));
    };


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
                                <ul className={styles.adminArticlesCategories}>
                                    {data.categories.map((category, id) =>
                                        <li key={category.id}
                                            className={styles.adminArticlesCategory}>
                                            <CategorySearch
                                                field={category}
                                                onChange={field => {
                                                    setData(prev => ({
                                                        ...prev,
                                                        categories: prev.categories.map(x =>
                                                            x.id === field.id ? field : x
                                                        ),
                                                    }));
                                                }}
                                            />
                                            <>
                                                {id === data.categories.length -1 &&
                                                    <button className={styles.adminCreateAdd} onClick={onClickAdd}>
                                                        <Image src={PlusIcon} alt={'Добавить категорию'}/>
                                                    </button>
                                                }
                                                {data.categories.length !== 1 &&
                                                    <button onClick={() => removeCategory(category.id)} className={styles.adminCreateRemoveBtn}>
                                                        <span className={styles.adminCreateRemove}></span>
                                                    </button>
                                                }
                                            </>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            {responseArticle?.success &&
                                <AdminArticleForm
                                    type={"edit"}
                                    url={url}
                                    setUrl={setUrl}
                                    image={image}
                                    setImage={setImage}
                                    onSend={onEdit}
                                    data={data}
                                    setData={setData}
                                    setValue={setValueContent}
                                    debouncedValue={responseArticle.data.content}
                                />
                            }
                        </div>
                    </div>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
