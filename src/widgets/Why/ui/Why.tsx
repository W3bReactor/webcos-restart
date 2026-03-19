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
                    <p className={styles.whyText}>Мы часто сталкивались с одной проблемой: <br/>
                        <strong>многие важные вещи в разработке почему-то сложно найти в интернете.</strong></p>
                    <p className={styles.whyText}>Например:</p>
                    <ul className={styles.list}>
                        <li>
                            <p className={styles.whyText}>Production-ready backend на Java</p>
                        </li>
                        <li>
                            <p className={styles.whyText}>Реальная архитектура проектов</p>
                        </li>
                        <li>
                            <p className={styles.whyText}>Как не терять преимущества Next js</p>
                        </li>
                        <li>
                            <p className={styles.whyText}>Работа с Canvas и сложной графикой</p>
                        </li>
                        <li>
                            <p className={styles.whyText}>практические решения, а не только теорию</p>
                        </li>

                    </ul>

                    <p className={styles.whyText}>Мы создаём этот проект, чтобы закрыть этот пробел.
                        Показывать реальные решения, делиться опытом и делать знания доступнее.</p>
                </div>
            </div>
        </section>
    );
}
