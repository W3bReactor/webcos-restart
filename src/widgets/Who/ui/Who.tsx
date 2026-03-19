import styles from './Who.module.css'
import React from "react";
import {WhoSlider} from "@/widgets/Who/ui/WhoSlider/WhoSlider";

export const Who = () => {

    return (
        <section className={styles.who}>
            <WhoSlider/>
            <div className={styles.whoContent}>
                <h2 className={styles.whoTitle}><span>Кто</span> мы?</h2>
                <p className={styles.whoDesc}>Мы — разработчики и авторы этого проекта. <br/>
                    Создаём сервисы, экспериментируем с идеями и делимся тем, что узнаём по пути.</p>

                <p className={styles.whoDesc}>Этот сайт — место, где встречаются два направления:
                    <span> разработка реальных проектов и блог о технологиях.</span> </p>
                <p className={styles.whoDesc}>Мы создаём новые сервисы, улучшаем существующие идеи и показываем, как всё это работает на практике.</p>
            </div>
        </section>

    );
}
