'use client'
import styles from './AdminStoryPage.module.css'
import {Footer, Header, AdminSidebar, AdminStoryPosition, AdminStoryForm} from "@/widgets";
import {useState} from "react";



export const AdminStoryPage = () => {
    const [editMode, setEditMode] = useState(false)
    const [edit, setEdit] = useState({
        id: -1,
        title: '',
        desc: '',
        year: ''
    })

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.app}>
                <section className={styles.adminMainWrapper}>
                    <AdminSidebar/>
                    <div className={styles.adminStoryColumn}>
                        <h1 className={styles.adminStoryTitle}>История</h1>
                        <div className={styles.adminStoryContent}>
                            <AdminStoryPosition setEdit={setEdit} setEditMode={setEditMode}/>
                            <AdminStoryForm initialId={edit.id} setEditMode={setEditMode} initialDesc={edit.desc} initialTitle={edit.title} initialYear={edit.year} type={editMode ? 'edit' : 'create'}/>
                        </div>
                    </div>
                </section>

            </main>
            <Footer/>


        </div>
    );
}
