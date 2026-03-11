'use client'
import React, {useState} from "react";
import styles from './AdminProjectsActions.module.css'
import {Input, PurpleBtn, RedBtn, StandardBtn} from "@/shared/ui";
import {useDebounce} from "@/shared/lib";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {deleteArticleApi, getArticlesApi} from "@/widgets/Blog/api/articlesApi";
import useSWR from "swr";
import {SearchItems} from "@/widgets";
import {deleteProjectApi, getProjectsApi} from "@/widgets/Projects/api/projectsApi";

export const AdminProjectsActions = () => {
    const [openDelete, setOpenDelete] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [debouncedValueUpdateProject, valueUpdateProject, setValueUpdateProject] = useDebounce('', 1000)
    const [debouncedValueDeleteProject, valueDeleteProject, setValueDeleteProject] = useDebounce('', 1000)
    const [data, setData] = useState({
        projectUpdateId: -1,
        projectDeleteId: -1
    })

    const onOpenEdit = () => {
        setOpenEdit(!openEdit)
        setOpenDelete(false)
    }
    const onOpenDelete = () => {
        setOpenDelete(!openDelete)
        setOpenEdit(false)
    }

    const onUpdateData = async (val: string, projectUpdateId: number) => {
        setValueUpdateProject(val)
        setData({...data, projectUpdateId})
    }

    const onDeleteData = async (val: string, projectDeleteId: number) => {
        setValueDeleteProject(val)
        setData({...data, projectDeleteId})
    }

    const { data: responseDelete,  trigger: deleteProject} = useSWRMutation<
        ApiResult<string>,
        Error,
        "projects/delete",
        number
    >(
        "projects/delete",
        (_, { arg }) => deleteProjectApi(arg)
    )


    const onDeleteProject = async () => {
        await deleteProject(data.projectDeleteId);
    }

    const { data: responseUpdateProject } = useSWR(
        ["projects", debouncedValueUpdateProject],
        async () => await getProjectsApi({size: 3, search: debouncedValueUpdateProject})
    )
    const { data: responseDeleteProject } = useSWR(
        ["projects", debouncedValueDeleteProject],
        async () => await getProjectsApi({size: 3, search: debouncedValueDeleteProject})
    )



    return (
        <>
            <h2 className={styles.adminArticlesInstrumentsTitle}>
                Проекты:
            </h2>
            <div className={styles.adminArticlesInstrumentsButtons}>
                <StandardBtn className={styles.adminArticlesInstrumentsBtn} type={'site-link'} href={'/admin/projects/create'}>Создать проект</StandardBtn>
                <StandardBtn className={styles.adminArticlesInstrumentsBtn} type={'btn'} onClick={onOpenEdit} >Изменить проект</StandardBtn>
                <StandardBtn className={styles.adminArticlesInstrumentsBtn} onClick={onOpenDelete} type={'btn'} >Удалить проект</StandardBtn>
            </div>
            {openEdit &&
                <div className={styles.adminArticlesInstrumentsSearch}>
                    <Input placeholder={'Найти...'} value={valueUpdateProject} setValue={setValueUpdateProject}/>
                    {debouncedValueUpdateProject.length > 0 && responseUpdateProject?.success && responseUpdateProject.data.content.length > 0 &&
                        <SearchItems data={responseUpdateProject.data.content} setItem={onUpdateData} className={styles.adminEditSearchItems}/>
                    }
                    <PurpleBtn className={styles.adminArticlesInstrumentsSearchBtn} type={'site-link'} href={`/admin/projects/edit/${data.projectUpdateId}`}>Изменить</PurpleBtn>
                </div>
            }

            {openDelete &&
                <div className={styles.adminArticlesInstrumentsSearch}>
                    <Input placeholder={'Найти...'} value={valueDeleteProject} setValue={setValueDeleteProject}/>
                    {debouncedValueDeleteProject.length > 0 && responseDeleteProject?.success && responseDeleteProject.data.content.length > 0 &&
                        <SearchItems data={responseDeleteProject.data.content} setItem={onDeleteData} className={styles.adminEditSearchItems}/>
                    }
                    <RedBtn onClick={onDeleteProject} className={styles.adminArticlesInstrumentsSearchBtn} type={'btn'}>Удалить</RedBtn>
                </div>
            }
        </>

    );
}
