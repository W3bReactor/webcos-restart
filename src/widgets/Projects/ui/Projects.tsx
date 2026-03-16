
import styles from './Projects.module.css'
import React from "react";
import {SectionDesc, SectionTitle, StandardBtn} from "@/shared/ui";
import {RocketAnimation} from "@/widgets/Projects/ui/RocketAnimation/RocketAnimation";
import {Project} from "@/entities/Project";
import {getProjectsApi} from "@/widgets/Projects";

export const Projects = async () => {
    const response = await getProjectsApi({size: 5})



    return (
        <section id={'projects'} className={styles.productsWrapper}>
            <div className={styles.productsRocketPosition}>
                <RocketAnimation/>
            </div>
            <SectionTitle className={styles.productsTitle}>Создаём новые сервисы</SectionTitle>
            <SectionDesc className={styles.productsDesc}>А также улучшаем уже готовые сервисы</SectionDesc>
            <ul className={styles.productsList}>
                {response.success && response.data.content.length > 0 ? response.data.content.map(project =>
                    <Project id={String(project.id)} key={project.id} className={styles.productItem} imageAnimation={styles.productInfinityRight} image={project.image} link={project.project_link} title={project.title} description={project.description} />
                ) :
                    <p>На данный момент проектов нет : (</p>
                }
            </ul>
            <StandardBtn type={'site-link'} href={'/projects'} className={styles.productsBtn}>Посмотреть всё</StandardBtn>
        </section>
    );
}

