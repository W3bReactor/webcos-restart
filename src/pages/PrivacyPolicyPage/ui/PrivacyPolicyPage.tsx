import styles from "./PrivacyPolicyPage.module.css";
import {Header, Footer} from "@/widgets";

export const PrivacyPolicyPage = () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.mainSection}>

                    <h1 className={styles.title}>Политика конфиденциальности</h1>
                    <p className={styles.desc}>
                        Настоящая политика конфиденциальности определяет порядок обработки информации пользователей сайта (далее — Сайт).
                    </p>
                    <p className={styles.desc}>
                        Используя Сайт, пользователь выражает согласие с настоящей политикой конфиденциальности.
                    </p>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>1. Какие данные могут обрабатываться</h2>
                            <p className={styles.itemDesc}>
                                Сайт не требует регистрации и не собирает персональные данные, позволяющие напрямую идентифицировать пользователя.
                            </p>
                            <p className={styles.itemDesc}>
                                При использовании Сайта автоматически могут обрабатываться следующие данные:
                            </p>
                            <ul className={styles.list}>
                                <li>
                                    <p className={styles.itemDesc}>• IP-адрес устройства</p>
                                </li>
                                <li>
                                    <p className={styles.itemDesc}>• тип и версия браузера</p>
                                </li>
                                <li>
                                    <p className={styles.itemDesc}>• информация об устройстве и операционной системе</p>
                                </li>
                                <li>
                                    <p className={styles.itemDesc}>• страницы сайта, которые посещает пользователь</p>
                                </li>
                                <li>
                                    <p className={styles.itemDesc}>• время посещения сайта</p>
                                </li>
                                <li>
                                    <p className={styles.itemDesc}>• файлы cookie</p>
                                </li>

                            </ul>

                        </li>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>2. Использование файлов cookie</h2>
                            <p className={styles.itemDesc}>Сайт использует файлы cookie для обеспечения корректной работы и улучшения пользовательского опыта.</p>
                            <p className={styles.itemDesc}>Файлы cookie — это небольшие текстовые файлы, которые сохраняются на устройстве пользователя.</p>
                            <p className={styles.itemDesc}>Сайт может использовать технические и аналитические файлы cookie, а также cookie для персонализации контента.</p>
                        </li>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>3. Аналитика посещаемости</h2>
                            <p className={styles.itemDesc}>Для анализа посещаемости сайта используется сервис Яндекс Метрика.</p>
                            <p className={styles.itemDesc}>Яндекс Метрика собирает обезличенные данные о действиях пользователей на сайте, включая посещаемые страницы и время взаимодействия с сайтом.</p>
                            <p className={styles.itemDesc}>Полученные данные используются исключительно для анализа работы сайта и его улучшения.</p>
                        </li>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>4. Персонализация контента</h2>
                            <p className={styles.itemDesc}>Сайт может использовать технический идентификатор пользователя (guest_id).</p>
                            <p className={styles.itemDesc}>Этот идентификатор используется для формирования персонализированных рекомендаций материалов сайта.</p>
                            <p className={styles.itemDesc}>Идентификатор не содержит информации, позволяющей установить личность пользователя.</p>
                        </li>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>5. Передача данных третьим лицам</h2>
                            <p className={styles.itemDesc}>Сайт не передает персональные данные пользователей третьим лицам, за исключением случаев, предусмотренных законодательством.</p>
                            <p className={styles.itemDesc}>Некоторые данные могут обрабатываться сторонними сервисами аналитики, такими как Яндекс Метрика.</p>
                        </li>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>6. Управление cookie</h2>
                            <p className={styles.itemDesc}>Пользователь может отключить использование файлов cookie в настройках своего браузера.</p>
                            <p className={styles.itemDesc}>При отключении cookie некоторые функции сайта могут работать некорректно.</p>
                        </li>
                        <li className={styles.listItem}>
                            <h2 className={styles.itemTitle}>7. Изменения политики</h2>
                            <p className={styles.itemDesc}>Администрация сайта оставляет за собой право вносить изменения в настоящую политику конфиденциальности.</p>
                            <p className={styles.itemDesc}>Актуальная версия политики всегда доступна на данной странице.</p>
                        </li>
                    </ul>
                </section>

            </main>
            <Footer/>
        </div>
    );
};

