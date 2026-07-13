"use client"
import styles from './PickupAccordion.module.css'
import React from "react";
import {AccordionItem, SectionDesc, SectionTitle} from "@/shared/ui";
import {pickupAccordion} from "@/widgets/PickupAccordion/ui/mock/pickupAccordion";


export const PickupAccordion = () => {


    return (
        <section className={styles.accordion}>
            <SectionTitle className={styles.accordionTitle}>Часто задаваемые вопросы</SectionTitle>
            <SectionDesc className={styles.accordionDesc}>Отвечаем на самые тревожащие вопросы</SectionDesc>
            <ul className={styles.accordionList}>
                {pickupAccordion.map(item =>
                    <AccordionItem key={item.id} title={item.title} desc={item.description}/>
                )}
            </ul>
        </section>
    );
}
