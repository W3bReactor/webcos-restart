'use client'
import React, {useEffect, useState} from "react";

import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/monokai-sublime.css';

import styles from './AdminArticleForm.module.css'
import { Input, PurpleBtn, Upload} from "@/shared/ui";
import ClientSideCustomEditor from "@/shared/ui/Editor/client-side-custom-editor";
import 'ckeditor5/ckeditor5-content.css';


interface Data {
    description: string
    title: string
    categoryId: number;
}


interface IAdminArticleForm{
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

export const AdminArticleForm = ({type, setData, data, setValue, debouncedValue, onSend, setImage, image, url, setUrl}: IAdminArticleForm) => {
    const onUpdateData = async (val: string) => {
        setValue(val)
    }

    const [error] = useState('')

    useEffect(() => {
        if(hljs) {

            document.querySelectorAll("code").forEach((e) => {
                if (!e.dataset.highlighted && e.textContent && e.textContent.length > 0) {
                    hljs.highlightElement(e);
                }
            });
            // document.querySelectorAll('pre code').forEach((block) => {
            //     window.hljs.highlightBlock(block);
            // });
        }

    }, [debouncedValue])

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
            <ClientSideCustomEditor onChange={(v: string) => onUpdateData(v)}/>
            {/*<div className={'ck-content ck-content--theme'} dangerouslySetInnerHTML={{__html: debouncedValue}}>*/}
            {/*</div>*/}
            <PurpleBtn onClick={onSend} className={styles.adminCreateBtn} type={'btn'}>{type === 'create' ? "Создать" : "Изменить"}</PurpleBtn>

        </div>
    );
}
