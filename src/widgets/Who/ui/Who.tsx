import styles from './Who.module.css'
import React from "react";
import {WhoSlider} from "@/widgets/Who/ui/WhoSlider/WhoSlider";

export const Who = () => {

    return (
        <section className={styles.who}>
            <WhoSlider/>
            <div className={styles.whoContent}>
                <h2 className={styles.whoTitle}><span>Кто</span> мы?</h2>
                <p className={styles.whoDesc}>Мы команда разработчиков создали полностью автоматического робота для торговли
                    на криптовалютном рынке!  Робот основан на комплексе нейронных сетей разной конфигурации, поэтому мы можем его назвать искусственным интеллектом.
                    Робот обучен на 5 000 000 реальных ситуаций на рынке криптовалют и показывает прекрасную статистику прогнозирования.</p>
                <p className={styles.whoDesc}>Наша разработка не требует специальных знаний в области финансов
                    <span> и достигает прибыльности до 200% в год</span> </p>

            </div>
        </section>

    );
}
