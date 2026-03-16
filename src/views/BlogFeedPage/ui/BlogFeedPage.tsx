import styles from "./BlogFeedPage.module.css";
import {Header, Footer, BlogFeed} from "@/widgets";
import {Sidebar} from "@/widgets/Sidebar";
import {BreadCrumbs} from "@/shared/ui";

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

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.blogLineWrapper}>
                    <div className={styles.blogLineColumn}>
                        <BreadCrumbs items={items}/>
                        <ul className={styles.blogLineList}>
                            <BlogFeed/>
                        </ul>
                    </div>
                    <Sidebar className={styles.blogLineSidebar}/>
                </section>
            </main>


            <Footer/>
        </div>
    );
};

