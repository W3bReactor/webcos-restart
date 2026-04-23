import styles from "./SortableItem.module.css";
import {DeleteIcon, EditIcon} from "@/shared/assets";
import React from "react";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import Image from "next/image";

interface ISortableTask {
    id: number
    title: string
    title_continue: string
    year: string
    position: number
}

export const SortableItem = ({ task, onClickEdit, onClickDelete }: { task: ISortableTask, onClickEdit: (id: number, title: string, desc: string, year: string) => void, onClickDelete: (v: number) => void }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const onClickEditBtn = (e: React.MouseEvent<HTMLElement>) => {
            e.stopPropagation()
            onClickEdit(task.id, task.title, task.title_continue, task.year)
    }

    const onClickDeleteBtn = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        onClickDelete(task.id)
    }


    return (
        <li
            ref={setNodeRef}
            style={style}
            className={styles.adminStoryPositionItem}
            {...attributes}
        >
            <div {...listeners}>
                <div className={styles.adminStoryPositionItemContent}>
                    <p className={styles.adminStoryPositionIndex}>
                        {task.position < 10 ? `0${task.position}` : task.position}
                    </p>
                    <h2 className={styles.adminStoryPositionItemTitle}>{task.title}</h2>
                </div>
            </div>

            <div className={styles.adminStoryPositionItemContent}>
                <p className={styles.adminStoryPositionYear}>{task.year}</p>
                <button
                    onClick={onClickEditBtn}
                    className={styles.adminStoryPositionInstrument}
                >
                    <Image alt={'Изменить'} className={styles.adminStoryPositionIcon} src={EditIcon}/>
                </button>
                <button
                    onClick={onClickDeleteBtn}
                    className={styles.adminStoryPositionInstrument}
                >
                    <Image alt={'Удалить'} className={styles.adminStoryPositionIcon} src={DeleteIcon}/>
                </button>
            </div>
        </li>

    );
};