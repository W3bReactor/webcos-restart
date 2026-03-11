import styles from "./BlogFeedPage.module.css";
import {Header, Footer} from "@/widgets";
import {Sidebar} from "@/widgets/Sidebar";
import {BlogItem} from "@/entities/BlogItem";
import {BreadCrumbs} from "@/shared/ui";
import {getArticlesApi} from "@/views/BlogFeedPage";

const items = [
    {
        label: 'Блог',
        path: '/blog'
    },
    {
        label: 'Моя лента',
        path: 'blog/all'

    }
]

export const BlogFeedPage = async () => {
    const data = await getArticlesApi()

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.blogLineWrapper}>
                    <div className={styles.blogLineColumn}>
                        <BreadCrumbs items={items}/>
                        <ul className={styles.blogLineList}>
                            {data.map(item =>
                                <BlogItem imageHeight={350} id={String(item.id)} key={item.id} className={styles.blogLineItem} title={item.title} image={item.url} description={'hello'}/>

                            )}
                        </ul>
                    </div>
                    <Sidebar className={styles.blogLineSidebar}/>
                </section>
            </main>


            <Footer/>
        </div>
    );
};

