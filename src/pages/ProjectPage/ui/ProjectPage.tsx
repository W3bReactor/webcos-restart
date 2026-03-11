import styles from './ProjectPage.module.css'
import {Footer, Header, Social} from "@/widgets";
import {ProjectArticle} from "@/widgets/ProjectArticle";


interface IProjectPage {
    projectId: string
}

export const ProjectPage = async ({projectId}: IProjectPage) => {
    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <ProjectArticle id={projectId}/>
                <Social href={'#'} platform={"Телеграм"} title={'Понравился проект?'} description={'Заходите к нам в телеграм и узнавайте про новые продукты первыми!'}/>
            </main>
            <Footer/>
        </div>
    );
}
