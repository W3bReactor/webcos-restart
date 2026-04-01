import styles from './BlogAllPage.module.css'
import {Footer, Header} from "@/widgets";
import {BreadCrumbs} from "@/shared/ui";
import {BlogItem} from "@/entities/BlogItem";
import {Sidebar} from "@/widgets/Sidebar";
import {CategoriesSidebar} from "@/widgets/CategoriesSidebar";
import {ArticlesAllIcon, MoonIcon} from "@/shared/assets";
import {ArticleControls} from "@/widgets/ArticleControls";
import Image from "next/image";
import {getCategoryApi} from "@/pages/BlogAllPage/api/categoryApi";
import {getArticlesApi} from "@/widgets/Blog";


interface IBlogAllPage {
    searchParams: { [key: string]: string };
    categoryId?: string;
}

const items = [
    {
        label: 'Блог',
        path: '/blog'
    },
    {
        label: 'Все статьи',
        path: '/blog/all'

    }]

export const BlogAllPage = async ({searchParams, categoryId}: IBlogAllPage) => {
    const currentSearch = searchParams?.search ?? "";
    const sort = searchParams?.sort ?? "createdAt";
    const order = searchParams?.order ?? "desc";
    const category = categoryId ?? ""
    const response = await getArticlesApi({search: currentSearch, sortBy: sort, order: order, category: category})
    let responseCategory;
    if(categoryId) {
        responseCategory = await getCategoryApi(categoryId);
    }
    return (
        <div className={styles.page}>
            {responseCategory && responseCategory.success &&
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CollectionPage",
                            "name": responseCategory.data.title,
                            "description": responseCategory.data.description,
                            "url": `https://webcos.ru/blog/category/${responseCategory.data.id}`
                        })
                    }}
                />
            }
            <Header/>
            <main className={styles.app}>
                <section className={styles.articles}>
                    <BreadCrumbs items={items}/>
                    <div className={styles.articlesContent}>
                        <CategoriesSidebar className={styles.articlesSidebar}/>
                        <div className={styles.articlesInfo}>
                            {responseCategory && responseCategory.success ?
                                <div className={styles.articlesTop}>
                                    {responseCategory.data.icon ?
                                        <Image  width={100} height={100} className={styles.articlesTopImage} src={responseCategory.data.icon} alt={responseCategory.data.title}/>
                                        :
                                        <Image width={100} height={100} className={styles.articlesTopImage} src={ArticlesAllIcon} alt={responseCategory.data.title}/>
                                    }
                                    <div className={styles.articlesTopItem}>
                                        <h2 className={styles.articlesTopTitle}>{responseCategory.data.title}</h2>
                                        <p className={styles.articlesTopDesc}>
                                            {responseCategory.data.description}
                                        </p>
                                    </div>
                                </div>
                                :
                                <div className={styles.articlesTop}>
                                    <Image width={100} height={100} className={styles.articlesTopImage} src={ArticlesAllIcon} alt={"Все статьи"}/>
                                    <div className={styles.articlesTopItem}>
                                        <h2 className={styles.articlesTopTitle}>Все статьи</h2>
                                        <p className={styles.articlesTopDesc}>
                                            Топовые статьи из нашей подборки
                                        </p>
                                    </div>
                                </div>
                            }

                            <div className={styles.articlesBottom}>
                                <div className={styles.articlesItem}>
                                    <ArticleControls currentSearch={currentSearch}/>
                                    <ul className={styles.articlesList}>
                                        {response.success && response.data.content.length > 0 ? response.data.content.map(item =>
                                            <BlogItem key={item.id} id={String(item.id)} className={styles.articlesListItem} title={item.title} image={item.image} description={item.description}/>
                                        )
                                            :
                                            <div className={styles.articlesNotFound}>Статьи не найдены</div>
                                        }
                                    </ul>
                                </div>
                                <Sidebar className={styles.articlesSidebarRecommend}/>
                            </div>
                        </div>

                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
}
