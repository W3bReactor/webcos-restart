'use client'
import styles from './AdminArticlesCreatePage.module.css'
import {Footer, Header, AdminSidebar, AdminArticleForm} from "@/widgets";

import {useEffect, useState} from "react";
import {PlusIcon} from "@/shared/assets";
import Image from "next/image";
import {useDebounce} from "@/shared/lib";
import {createArticleApi, uploadImageArticleApi} from "@/widgets/Blog/api/articlesApi";
import useSWRMutation from "swr/mutation";
import {ArticleCreate, ArticleUploadImage} from "@/widgets/Blog/api/types";
import {ApiResult} from "@/shared/model";
import {IArticle} from "@/widgets/Blog";
import {redirect} from "next/navigation";
import {JSONContent} from "@tiptap/core";
import {CategorySearch} from "@/features/CategorySearch";


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


export const AdminArticlesCreatePage = () => {

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


    const {data: responseCreate, trigger: createArticle} = useSWRMutation<
        ApiResult<IArticle>,
        Error,
        "articles/create",
        ArticleCreate
    >(
        "articles/create",
        (_, {arg}) => createArticleApi(arg)
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

    useEffect(() => {
        if (responseCreate?.success && responseCreate.data.id && image) {
            const FD = new FormData();
            FD.append('file', image);
            uploadArticle({articleId: responseCreate.data.id, body: FD})
        }
        if (responseCreate?.success) {
            redirect(`/blog/${responseCreate.data.id}`)
        }
    }, [responseCreate, image, uploadArticle]);


    const onCreate = async () => {
        await createArticle(
            {
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
                        <h1 className={styles.adminCreateTitle}>Создание статьи</h1>
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
                                                {id === data.categories.length - 1 &&
                                                    <button className={styles.adminCreateAdd} onClick={onClickAdd}>
                                                        <Image src={PlusIcon} alt={'Добавить категорию'}/>
                                                    </button>
                                                }
                                                {data.categories.length !== 1 &&
                                                    <button onClick={() => removeCategory(category.id)}
                                                            className={styles.adminCreateRemoveBtn}>
                                                        <span className={styles.adminCreateRemove}></span>
                                                    </button>
                                                }
                                            </>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                        <AdminArticleForm
                            type={"create"}
                            setUrl={setUrl}
                            url={url}
                            image={image}
                            setImage={setImage}
                            onSend={onCreate}
                            data={data}
                            setData={setData}
                            setValue={setValueContent}
                            debouncedValue={debouncedValueContent}
                        />
                    </div>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
