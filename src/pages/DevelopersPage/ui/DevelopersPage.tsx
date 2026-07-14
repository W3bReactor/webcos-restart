import styles from "./DevelopersPage.module.css";
import {Header, RoadMap, Contacts, Footer, Who, BugReport, Why} from "@/widgets";

export const DevelopersPage = () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <Who/>
                <Why/>
                <RoadMap/>
                <BugReport/>
                <Contacts/>

            </main>
            <Footer/>
        </div>
    );
};

