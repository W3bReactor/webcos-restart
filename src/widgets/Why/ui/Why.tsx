import styles from './Why.module.css'
import React from "react";
import Image from "next/image";
import {SectionTitle} from "@/shared/ui";
import {WhyImage} from "@/widgets/Why";


export const Why = () => {
    return (
        <section className={styles.why}>
            <SectionTitle className={styles.whyTitle}>Для чего мы это делаем?</SectionTitle>
            <div className={styles.whyWrapper}>
                <div>
                    <Image src={WhyImage} alt={'Для чего мы это делаем?'} className={styles.whyImage} />
                </div>
                <div className={styles.whyContent}>
                    <p className={styles.whyText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                    <p className={styles.whyText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum volutpat orci turpis urna. Et vestibulum, posuere tortor lacinia sit. Sagittis porttitor orci auctor in at tincidunt arcu egestas. Fusce arcu sodales lacinia eu auctor nunc nam id. Diam sit sed volutpat massa. Egestas ornare vel volutpat.</p>
                </div>
            </div>
        </section>
    );
}
