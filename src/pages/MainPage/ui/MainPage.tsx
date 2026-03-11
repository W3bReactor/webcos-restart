import styles from "./MainPage.module.css";
import {Header, Intro, Projects, Blog, RoadMap, Contacts, Footer} from "@/widgets";

export const MainPage = () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <Intro/>
                <Projects/>
                <Blog/>
                <RoadMap/>
                <Contacts/>
            </main>
            <Footer/>
        </div>
    );
};

