'use client'
import React, {useState} from "react";
import styles from './AdminArticleForm.module.css'
import { Input, PurpleBtn, Upload} from "@/shared/ui";
import TiptapEditor from "@/shared/ui/Editor/TiptapEditor";
import {JSONContent} from "@tiptap/core";


interface CategoryField {
    id: string;
    categoryId: number | null;
    title: string;
}

interface FormData {
    title: string;
    description: string;
    categories: CategoryField[];
}

interface IAdminArticleForm{
    data: FormData,
    setData: (v: FormData) => void;
    debouncedValue: JSONContent;
    setValue: (v: JSONContent) => void;
    onSend: () => void;
    image: File | null;
    setImage: (v: File | null) => void;
    setUrl: (v: string) => void;
    url: string;
    type: 'edit' | 'create';
}

export const AdminArticleForm = ({type, setData, data, setValue, debouncedValue, onSend, setImage, image, url, setUrl}: IAdminArticleForm) => {
    const onUpdateData = async (val: JSONContent) => {
        setValue(val)
    }

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
            <TiptapEditor value={debouncedValue} onChange={onUpdateData}/>
            <PurpleBtn onClick={onSend} className={styles.adminCreateBtn} type={'btn'}>{type === 'create' ? "Создать" : "Изменить"}</PurpleBtn>

        </div>
    );
}
