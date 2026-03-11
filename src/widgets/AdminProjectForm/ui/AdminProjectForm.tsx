'use client'
import React, {useState} from "react";
import styles from './AdminProjectForm.module.css'
import { Input, PurpleBtn, Upload} from "@/shared/ui";


interface Data {
    description: string
    title: string
    link: string;
}

interface IAdminProjectForm {
    data: Data,
    setData: (v: Data) => void;
    debouncedValue: string;
    setValue: (v: string) => void;
    onSend: () => void;
    image: File | null;
    setImage: (v: File | null) => void;
    setUrl: (v: string) => void;
    url: string;
    type: 'edit' | 'create';
}

export const AdminProjectForm = ({type, setData, data, setValue, debouncedValue, onSend, setImage, image, url, setUrl}: IAdminProjectForm) => {

    const [error] = useState('')


    return (
        <div className={styles.adminCreateForm}>
            {error &&
                <h2 className={styles.adminError}>{error}</h2>
            }
            <Upload url={url} setUrl={setUrl} image={image} setImage={setImage}/>
            <Input className={styles.adminCreateInput} placeholder={'Заголовок'} value={data.title} setValue={(value) => setData({...data, title: value})}/>
            <textarea
                value={data.description}
                onChange={(e) => setData({...data, description: e.target.value})}
                placeholder={'Описание'}
                className={styles.adminTextarea}
            />
            <Input className={styles.adminCreateInput} placeholder={'Ссылка на проект'} value={data.link} setValue={(value) => setData({...data, link: value})}/>
            <PurpleBtn onClick={onSend} className={styles.adminCreateBtn} type={'btn'}>{type === 'create' ? "Создать" : "Изменить"}</PurpleBtn>

        </div>
    );
}
