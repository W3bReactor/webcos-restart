import styles from "./CookiePolicyPage.module.css";
import {Header, Footer} from "@/widgets";

export const CookiePolicyPage = () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.mainSection}>

                    <h1 className={styles.title}>Политика использования cookie-файлов</h1>
                    <p className={styles.desc}>
                        На сайте используются файлы cookie.

                        Файлы cookie — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя
                        после посещения сайта.

                        Использование файлов cookie позволяет обеспечивать корректную работу сайта, анализировать
                        использование сайта пользователями и улучшать его функциональность.
                    </p>

                    <p className={styles.desc}>На сайте используются следующие типы файлов cookie:</p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>1. Технические файлы cookie</h2>
                            <p className={styles.itemDesc}>Они необходимы для корректной работы сайта. Такие cookie
                                позволяют определять параметры устройства пользователя, обеспечивать стабильную работу
                                сервисов сайта и выявлять технические ошибки.</p>
                        </li>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>2. Аналитические файлы cookie</h2>
                            <p className={styles.itemDesc}>Они используются для анализа посещаемости сайта: подсчёта
                                количества пользователей, определения посещаемых страниц и времени взаимодействия с
                                сайтом.</p>
                            <p className={styles.itemDesc}>Для сбора аналитических данных используется сервис Яндекс
                                Метрика.</p>
                        </li>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>3. Файлы персонализации</h2>
                            <p className={styles.itemDesc}>Некоторые cookie используются для формирования
                                персонализированных рекомендаций материалов сайта.</p>
                        </li>
                    </ul>
                    <h2 className={styles.subtitle}>Срок хранения</h2>
                    <p className={styles.desc}>Срок хранения файлов cookie зависит от их типа и не превышает срока,
                        необходимого для достижения целей их использования.</p>
                    <h2 className={styles.subtitle}>Срок хранения</h2>
                    <p className={styles.desc}>Продолжая использовать сайт, пользователь соглашается на использование
                        файлов cookie в соответствии с настоящими условиями.</p>
                    <h2 className={styles.subtitle}>Как отключить cookie</h2>
                    <p className={styles.desc}>Пользователь может отключить использование файлов cookie в настройках
                        своего браузера.</p>
                    <p className={styles.desc}>При отключении cookie некоторые функции сайта могут работать
                        некорректно.</p>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

