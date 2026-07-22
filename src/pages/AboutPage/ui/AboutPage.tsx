import styles from "./AboutPage.module.css";
import {Header, RoadMap, Contacts, Footer, BugReport, Why} from "@/widgets";

export const AboutPage = () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                {/*<Who/>*/}
                <Why/>
                <RoadMap/>
                <BugReport/>
                <Contacts/>

            </main>
            <Footer/>
        </div>
    );
};

