import styles from "./BlogPage.module.css";
import {Header, Footer, Slider, Social} from "@/widgets";
import {ContentSlider} from "@/widgets/ContentSlider";
import {getBannersApi} from "@/shared/api";
import {getArticlesApi} from "@/widgets/Blog";

export const BlogPage = async () => {
    const [
        response,
        responseRecommend,
        responsePopular,
        responseNew
    ] = await Promise.all([
        getBannersApi({ type: "ARTICLE" }),
        getArticlesApi({ sortBy: "createdAt", order: "asc" }),
        getArticlesApi({ sortBy: "views", order: "desc" }),
        getArticlesApi({ sortBy: "createdAt", order: "desc" })
    ]);

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                {response.success && response.data.content.length > 0 &&
                    <Slider data={response.data.content}/>
                }
                {responseRecommend.success && responseRecommend.data.content.length > 0 &&
                    <ContentSlider title={'Рекомендуем'} data={responseRecommend.data.content}/>
                }
                {responsePopular.success && responsePopular.data.content.length > 0 &&
                    <ContentSlider title={'Популярное'} data={responsePopular.data.content}/>
                }
                {responseNew.success && responseNew.data.content.length > 0 &&
                    <ContentSlider title={'Новое'} data={responseNew.data.content}/>
                }
                <Social href={'#'} platform={"Телеграм"} title={'Хотите больше статей?'} description={'Заходите к нам в телеграм'}/>
            </main>
            <Footer/>
        </div>
    );
};

