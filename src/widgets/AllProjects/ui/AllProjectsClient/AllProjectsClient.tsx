"use client";
import styles from './AllProjectsClient.module.css'
import React from "react";
import {SectionDesc, SectionTitle, StandardBtn} from "@/shared/ui";
import {Project} from "@/entities/Project";
import {getProjectsApi, IProject} from "@/widgets/Projects";
import {ApiResult, PageResponse} from "@/shared/model";
import useSWRInfinite from "swr/infinite";


const PAGE_SIZE = 5;
interface IAllProjectsClient {
    initialProjects: IProject[];
}

export const AllProjectsClient = ({initialProjects}: IAllProjectsClient) => {
    const getKey = (
        pageIndex: number,
        previousPageData: ApiResult<PageResponse<IProject>> | null
    ) => {

        if (
            previousPageData && previousPageData.success &&
            pageIndex >= previousPageData.data.totalPages
        ) {
            return null
        }

        return { page: pageIndex, size: PAGE_SIZE }
    }
    const { data, size, setSize, isLoading } = useSWRInfinite(
        getKey,
        ({ page, size }) => getProjectsApi({ page, size }),
        {
            fallbackData: [
                {
                    success: true,
                    data: {
                        content: initialProjects,
                        totalElements: initialProjects.length,
                        totalPages: 1,
                        page: 0,
                        size: PAGE_SIZE
                    }
                }
            ]
        }
    );

    const projects = data
        ?.flatMap(page => page.success ? page.data.content : []) ?? [];

    const last = (data && data[data.length-1]) ? data[data.length-1] : false;
    const isLast = last && last.success && last.data ? last.data.totalPages - 1 === last.data.page : false;


    return (
        <section  className={styles.allProductsWrapper}>
            <SectionTitle className={styles.allProductsTitle}>Наши продукты</SectionTitle>
            <SectionDesc className={styles.allProductsDesc}>Мы облегчаем вашу жизнь нашими сервисами</SectionDesc>
            <ul className={styles.allProductsList}>
                {projects.length > 0 ? projects.map(project =>
                    <Project link={project.project_link} key={project.id} id={String(project.id)} className={styles.productItem} imageAnimation={styles.productInfinityRight} image={project.image} title={project.title} description={project.description} />
                )
                :
                    <div>На данный момент проектов нет :(</div>
                }
            </ul>
            {!isLast &&
                <StandardBtn onClick={() => setSize(size + 1)} disabled={isLoading} type={'btn'} className={styles.allProductsBtn}>Посмотреть ещё</StandardBtn>
            }
        </section>
    );
}

