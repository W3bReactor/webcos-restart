'use client'
import React, {useEffect, useState} from "react";
import styles from './AdminStoryPosition.module.css'
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import {SortableItem} from "@/widgets/AdminStoryPosition/ui/SortableItem/SortableItem";
import useSWR from "swr";
import {getStoriesApi, IStory} from "@/widgets/RoadMap";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {IBanner} from "@/widgets/Slider";
import {BannerUpdate} from "@/shared/api/banners/types";
import {updateBannerApi} from "@/shared/api/banners/bannersApi";
import {deleteStoryApi, updateStoriesPositionApi, updateStoryApi} from "@/widgets/RoadMap/api/storiesApi";
import {StoryPositionUpdate, StoryUpdate} from "@/widgets/RoadMap/api/types";

interface IEdit {
    id: number;
    title: string;
    desc: string;
    year: string;
}

interface IAdminStoryPosition {
    setEdit: (el: IEdit) => void;
    setEditMode: (el: boolean) => void;
}

export const AdminStoryPosition = ({ setEditMode, setEdit }: IAdminStoryPosition) => {
    const [stories, setStories] = useState([
        {
            id: -1,
            title: "",
            title_continue: "",
            year: "",
            position: -1
        }
    ]);
    const [isMounted, setIsMounted] = useState(false)

    const {data: responseStories, mutate} = useSWR(
        ["stories"],
        async () => await getStoriesApi()
    )

    const { data: responseUpdateStoriesPosition, trigger: updateStoriesPosition } = useSWRMutation<
        ApiResult<string>,
        Error,
        "stories/update/positions",
        StoryPositionUpdate[]
    >(
        "stories/update/positions",
        (_, { arg }) => updateStoriesPositionApi(arg)
    )

    const { data: responseDeleteStory, trigger: deleteStory } = useSWRMutation<
        ApiResult<string>,
        Error,
        "stories/delete",
        number
    >(
        "stories/delete",
        (_, { arg }) => deleteStoryApi(arg)
    )



    useEffect(() => {
        if(responseStories?.success) {
            setStories(responseStories.data.content)
        }
        setIsMounted(true)
    }, [responseStories])



    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const onClickEdit = (id: number, title: string, desc: string, year: string) => {
        setEditMode(true);
        setEdit({ id, desc, year, title });
    }

    const onClickDelete = async (storyId: number) => {
        await deleteStory(storyId);
    }


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setStories((items) => {
                const oldIndex = items.findIndex(item => item.id === active.id);
                const newIndex = items.findIndex(item => item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex)
                    .map((item, index) => ({
                        ...item,
                        position: index + 1
                    }));
                updateStoriesPosition(newItems)
                return newItems;
            });
        }
    };
    if (!isMounted) {
        return <div>Загрузка...</div>
    }
    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={stories}
                strategy={verticalListSortingStrategy}
            >
                <ul className={styles.adminStoryList}>
                    {stories.map((story) =>
                        <SortableItem
                            key={story.id}
                            task={story}
                            onClickEdit={onClickEdit}
                            onClickDelete={onClickDelete}
                        />
                    )}
                </ul>
            </SortableContext>
        </DndContext>
    );
}
