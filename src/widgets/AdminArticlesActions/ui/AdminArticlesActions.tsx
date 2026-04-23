'use client'
import React, {useState} from "react";
import styles from './AdminArticlesActions.module.css'
import {Input, PurpleBtn, RedBtn, StandardBtn} from "@/shared/ui";
import {SearchItems} from "@/widgets";
import useSWR from "swr";
import {useDebounce} from "@/shared/lib";
import {getArticlesApi} from "@/widgets/Blog";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {deleteArticleApi} from "@/widgets/Blog/api/articlesApi";

export const AdminArticlesActions = () => {
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [debouncedValueUpdateArticle, valueUpdateArticle, setValueUpdateArticle] = useDebounce('', 1000)
    const [debouncedValueDeleteArticle, valueDeleteArticle, setValueDeleteArticle] = useDebounce('', 1000)
    const [data, setData] = useState({
        articleUpdateId: -1,
        articleDeleteId: -1
    })

    const onOpenEdit = () => {
        setOpenEdit(!openEdit)
        setOpenDelete(false)
    }
    const onOpenDelete = () => {
        setOpenDelete(!openDelete)
        setOpenEdit(false)
    }

    const onUpdateData = async (val: string, articleUpdateId: number) => {
        setValueUpdateArticle(val)
        setData({...data, articleUpdateId})
    }

    const onDeleteData = async (val: string, articleDeleteId: number) => {
        setValueDeleteArticle(val)
        setData({...data, articleDeleteId})
    }

    const { trigger: deleteArticle} = useSWRMutation<
        ApiResult<string>,
        Error,
        "articles/delete",
        number
    >(
        "articles/delete",
        (_, { arg }) => deleteArticleApi(arg)
    )


    const onDeleteArticle = async () => {
        await deleteArticle(data.articleDeleteId);
    }



    const { data: responseUpdateArticle } = useSWR(
        ["categories", debouncedValueUpdateArticle],
        async () => await getArticlesApi({size: 3, search: debouncedValueUpdateArticle})
    )
    const { data: responseDeleteArticle } = useSWR(
        ["categories", debouncedValueDeleteArticle],
        async () => await getArticlesApi({size: 3, search: debouncedValueDeleteArticle})
    )


    return (
        <>
            <h2 className={styles.adminArticlesInstrumentsTitle}>
                Статьи:
            </h2>
            <div className={styles.adminArticlesInstrumentsButtons}>
                <StandardBtn className={styles.adminArticlesInstrumentsBtn} type={'site-link'} href={'/admin/articles/create'}>Создать статью</StandardBtn>
                <StandardBtn className={styles.adminArticlesInstrumentsBtn} type={'btn'} onClick={onOpenEdit} >Изменить статью</StandardBtn>
                <StandardBtn className={styles.adminArticlesInstrumentsBtn} onClick={onOpenDelete} type={'btn'} >Удалить статью</StandardBtn>
            </div>
            {openEdit &&
                <div className={styles.adminArticlesInstrumentsSearch}>
                    <Input placeholder={'Найти...'} value={valueUpdateArticle} setValue={setValueUpdateArticle}/>
                    {debouncedValueUpdateArticle.length > 0 && responseUpdateArticle?.success && responseUpdateArticle.data.content.length > 0 &&
                        <SearchItems data={responseUpdateArticle.data.content} setItem={onUpdateData} className={styles.adminEditSearchItems}/>
                    }
                    <PurpleBtn className={styles.adminArticlesInstrumentsSearchBtn} type={'site-link'} href={`/admin/articles/edit/${data.articleUpdateId}`}>Изменить</PurpleBtn>
                </div>
            }

            {openDelete &&
                <div className={styles.adminArticlesInstrumentsSearch}>
                    <Input placeholder={'Найти...'} value={valueDeleteArticle} setValue={setValueDeleteArticle}/>
                    {debouncedValueDeleteArticle.length > 0 && responseDeleteArticle?.success && responseDeleteArticle.data.content.length > 0 &&
                        <SearchItems data={responseDeleteArticle.data.content} setItem={onDeleteData} className={styles.adminEditSearchItems}/>
                    }
                    <RedBtn onClick={onDeleteArticle} className={styles.adminArticlesInstrumentsSearchBtn} type={'btn'}>Удалить</RedBtn>
                </div>
            }
        </>

    );
}
