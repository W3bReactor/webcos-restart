import styles from './Intro.module.css'
import React from "react";
import Image from "next/image";
import {SectionDesc, StandardBtn} from "@/shared/ui";
import {PlanetSystem} from "./PlanetSystem/PlanetSystem";
import {SolarSystemBlackImage, SolarSystemImage} from "@/widgets/Intro";
export const Intro = () => {
    return (
        <section className={styles.intro}>
            <div className={styles.introContent}>
                <h1 className={styles.introTitle}>Начало <br/> <span>чего-то нового...</span></h1>
                <SectionDesc className={styles.introDesc}>Мы создаём сервисы, исследуем технологии и делимся опытом разработки. <br/>
                    Иногда лучшие идеи — это просто старые идеи, сделанные правильно. </SectionDesc>
                <Image alt={'Солнечная система'} data-hide-on-theme="light" className={styles.solarSystem} src={SolarSystemImage}/>
                <Image alt={'Солнечная система'} data-hide-on-theme="dark" className={styles.solarSystem} src={SolarSystemBlackImage}/>
                <StandardBtn type={'link'} className={styles.introBtn} href={'#projects'}>Подробнее</StandardBtn>
            </div>
            <PlanetSystem/>
        </section>
    );
}
