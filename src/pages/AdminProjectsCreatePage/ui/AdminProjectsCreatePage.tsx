'use client'
import styles from './AdminProjectsCreatePage.module.css'
import {Footer, Header, AdminSidebar, AdminProjectForm} from "@/widgets";
import {useEffect, useState} from "react";
import {useDebounce} from "@/shared/lib";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {createProjectApi, uploadImageProjectApi} from "@/widgets/Projects/api/projectsApi";
import {IProject} from "@/widgets/Projects";
import {ProjectCreate, ProjectUploadImage} from "@/widgets/Projects/api/types";
import {redirect} from "next/navigation";


export const AdminProjectsCreatePage = () => {
    const [data, setData] = useState({
        title: '',
        description: '',
        link: ''
    })
    const [debouncedValueContent, _valueContent, setValueContent] = useDebounce('', 1000)
    const [image, setImage] = useState<File | null>(null)
    const [url, setUrl] = useState('')

    const { data: responseCreate, trigger: createProject } = useSWRMutation<
        ApiResult<IProject>,
        Error,
        "projects/create",
        ProjectCreate
    >(
        "projects/create",
        (_, { arg }) => createProjectApi(arg)
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

    useEffect(() => {
        if(responseCreate?.success && responseCreate.data.id && image) {
            const FD = new FormData();
            FD.append('file', image);
            uploadProject({projectId: responseCreate.data.id, body: FD})
        }
        if(responseCreate?.success) {
            redirect(`/projects`)
        }
    }, [responseCreate, image, uploadProject]);

    const onCreate = async () => {
        await createProject(
            {
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
                        <h1 className={styles.adminCreateTitle}>Создание проекта</h1>
                        <div className={styles.adminCreateContent}>
                            <AdminProjectForm type={"create"} setUrl={setUrl} url={url} image={image} setImage={setImage} onSend={onCreate} data={data} setData={setData} setValue={setValueContent} debouncedValue={debouncedValueContent}/>
                        </div>
                    </div>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
