'use client'
import styles from './AdminProjectsEditPage.module.css'
import {Footer, Header, AdminSidebar} from "@/widgets";

import {useEffect, useState} from "react";
import {useDebounce} from "@/shared/lib";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {IProject} from "@/widgets/Projects";
import {ProjectUpdate, ProjectUploadImage} from "@/widgets/Projects/api/types";
import {getProjectApi, updateProjectApi, uploadImageProjectApi} from "@/widgets/Projects/api/projectsApi";
import {redirect} from "next/navigation";
import {AdminProjectForm} from "@/widgets/AdminProjectForm";
import {toInteger} from "es-toolkit/compat";
import useSWR from "swr";


interface IAdminProjectsEditPage {
    projectId: string
}
export const AdminProjectsEditPage = ({projectId}: IAdminProjectsEditPage) => {
    const [data, setData] = useState({
        title: '',
        description: '',
        link: ''
    })
    const [debouncedValueContent, _valueContent, setValueContent] = useDebounce('', 1000)
    const [image, setImage] = useState<File | null>(null)
    const [url, setUrl] = useState('')

    const { data: responseUpdate, trigger: updateProject } = useSWRMutation<
        ApiResult<IProject>,
        Error,
        "projects/edit",
        ProjectUpdate
    >(
        "projects/edit",
        (_, { arg }) => updateProjectApi(arg)
    )

    const { trigger: uploadProject } = useSWRMutation<
        ApiResult<string>,
        Error,
        "projects/upload/image",
        ProjectUploadImage
    >(
        "projects/upload/image",
        (_, { arg }) => uploadImageProjectApi(arg)
    )

    const { data: responseProject } = useSWR(
        ["project"],
        async () => await getProjectApi(projectId)
    )


    useEffect(() => {
        if(responseUpdate?.success && responseUpdate.data.id && image) {
            const FD = new FormData();
            FD.append('file', image);
            uploadProject({projectId: responseUpdate.data.id, body: FD})
        }
        if(responseUpdate?.success) {
            redirect(`/projects`)
        }
    }, [responseUpdate, image, uploadProject]);

    useEffect(() => {
        if(responseProject?.success) {
            setData({
                title: responseProject.data.title,
                link: responseProject.data.project_link,
                description: responseProject.data.description,
            })
            setUrl(responseProject.data.image);
        }
    }, [responseProject]);


    const onEdit = async () => {
        await updateProject(
            {
                id: toInteger(projectId),
                description: data.description,
                title: data.title,
                project_link: data.link
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
                        <h1 className={styles.adminCreateTitle}>Редактирование проекта</h1>
                        <div className={styles.adminCreateContent}>
                            <AdminProjectForm type={"edit"} url={url} setUrl={setUrl} image={image} setImage={setImage} onSend={onEdit} data={data} setData={setData} setValue={setValueContent} debouncedValue={debouncedValueContent}/>
                        </div>
                    </div>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
