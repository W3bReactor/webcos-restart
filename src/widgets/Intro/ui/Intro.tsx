import styles from './Intro.module.css'
import React from "react";
import {SectionDesc, StandardBtn} from "@/shared/ui";
import {PlanetSystem} from "./PlanetSystem/PlanetSystem";

export const Intro = () => {
    return (
        <section data-avi className={styles.intro}>
            <div className={styles.introContent}>
                <h1 className={styles.introTitle}>Начало <br/> <span>чего-то нового...</span></h1>
                <SectionDesc className={styles.introDesc}>Мы создаём сервисы, исследуем технологии и делимся опытом разработки. <br/>
                    Иногда лучшие идеи — это просто старые идеи, сделанные правильно. </SectionDesc>
                <StandardBtn type={'link'} className={styles.introBtn} href={'#projects'}>Подробнее</StandardBtn>
            </div>
            <PlanetSystem/>
        </section>
    );
}
