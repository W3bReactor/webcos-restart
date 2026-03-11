import styles from './ProjectsPage.module.css'
import {Footer, Header, Why, Social, AllProjects, Slider} from "@/widgets";
import {getBannersApi} from "@/shared/api";



export const ProjectsPage = async () => {
    const response = await getBannersApi({type: "PROJECT"})

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                {response.success && response.data.content.length > 0 &&
                    <Slider data={response.data.content}/>
                }
                <Why/>
                <AllProjects/>
                <Social href={'#'} platform={"Телеграм"} title={'Хотите больше сервисов?'} description={'Заходите к нам в телеграм'}/>
            </main>
            <Footer/>


        </div>
    );
}
