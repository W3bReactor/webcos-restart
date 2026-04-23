'use client'
import React, {useEffect, useState} from "react";
import styles from './AdminStoryForm.module.css'
import {Input, PurpleBtn, RedBtn} from "@/shared/ui";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {StoryCreate, StoryUpdate} from "@/widgets/RoadMap/api/types";
import {createStoryApi, updateStoryApi} from "@/widgets/RoadMap/api/storiesApi";
import {IStory} from "@/widgets/RoadMap";

interface IAdminStoryForm {
    type: 'edit' | 'create'
    initialId: number,
    initialTitle: string
    initialDesc: string
    initialYear: string
    setEditMode: (el: boolean) => void
}

export const AdminStoryForm = ({type, initialId, initialTitle, initialYear, initialDesc, setEditMode}: IAdminStoryForm) => {
    const [id, setId] = useState(initialId)
    const [title, setTitle] = useState(initialTitle)
    const [desc, setDesc] = useState(initialYear)
    const [year, setYear] = useState(initialDesc)
    useEffect(() => {
        setId(initialId)
        setTitle(initialTitle)
        setDesc(initialDesc)
        setYear(initialYear)
    }, [initialTitle, initialYear, initialDesc, initialId])

    const onClickCancel = () => {
        setTitle('')
        setDesc('')
        setYear('')
        setId(-1)
        setEditMode(false)
    }

    const { trigger: createStory } = useSWRMutation<
        ApiResult<IStory>,
        Error,
        "stories/create",
        StoryCreate
    >(
        "stories/create",
        (_, { arg }) => createStoryApi(arg)
    )

    const { trigger: updateStory } = useSWRMutation<
        ApiResult<IStory>,
        Error,
        "stories/update",
        StoryUpdate
    >(
        "stories/update",
        (_, { arg }) => updateStoryApi(arg)
    )

    const onSend = async () => {
        if(type == "create") {
            createStory({
                title,
                year,
                title_continue: desc
            })
        } else {
            updateStory({
                id,
                title,
                year,
                title_continue: desc
            })

        }
        setTitle("");
        setYear("")
        setId(-1)
        setDesc("")
    }

    return (
        <div>
            <h2 className={styles.adminStoryTitle}>{type === 'create' ? 'Добавление' : 'Изменение'} истории</h2>
            <form className={styles.adminStoryForm}>
                <Input className={styles.adminStoryInput} placeholder={'Заголовок'} value={title} setValue={setTitle}/>
                <Input className={styles.adminStoryInput} placeholder={'Продолжение заголовка'} value={desc} setValue={setDesc}/>
                <Input className={styles.adminStoryInput} placeholder={'Год'} value={year} setValue={setYear}/>
                <div className={styles.adminStoryButtons}>
                    {type === 'edit' &&
                        <RedBtn onClick={onClickCancel} className={styles.adminStoryBtn} type={'btn'} btnType={'submit'}>
                            Отменить
                        </RedBtn>
                    }
                    <PurpleBtn onClick={onSend} className={styles.adminStoryBtn} type={'btn'} btnType={'button'}>
                        {type === 'create' ? 'Добавить' : 'Изменить'}
                    </PurpleBtn>
                </div>
            </form>

        </div>

    );
}
