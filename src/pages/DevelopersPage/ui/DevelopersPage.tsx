import styles from "./DevelopersPage.module.css";
import {Header, RoadMap, Contacts, Footer, Who, BugReport} from "@/widgets";

export const DevelopersPage = () => {

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <Who/>
                <RoadMap/>
                <BugReport/>
                <Contacts/>

            </main>
            <Footer/>
        </div>
    );
};

