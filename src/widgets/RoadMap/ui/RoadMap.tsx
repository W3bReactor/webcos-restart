import styles from './RoadMap.module.css'
import React from "react";
import {SectionDesc, SectionTitle} from "@/shared/ui";
import {ParrotAnimation} from "@/widgets/RoadMap/ui/ParrotAnimation/ParrotAnimation";
import {Road} from "@/widgets/RoadMap/ui/Road/Road";
import {getStoriesApi} from "@/widgets/RoadMap";

export const RoadMap = async () => {
    const response = await getStoriesApi()

    return (
        <section id={'roadmap'} className={styles.roadMapWrapper}>
            <div className={styles.roadMapParrotPosition}>
                <ParrotAnimation/>
            </div>
            <SectionTitle className={styles.roadMapTitle}>Как мы планируем развиваться?</SectionTitle>
            <SectionDesc className={styles.roadMapDesc}>RoadMap</SectionDesc>
            {response.success && response.data.content.length > 0 ?
                <Road data={response.data.content}/>
            :
                <p>Не найдено историй :(</p>
            }
        </section>

    );
}


