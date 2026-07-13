'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import { MenuBar } from './MenuBar/MenuBar'
import styles from './TiptapEditor.module.css'
import {editorExtensions} from "@/shared/ui/Editor/lib/extensions";
import 'highlight.js/styles/monokai-sublime.css';
import './tiptap.css';
import {BubbleMenu} from "@tiptap/react/menus";
import {JSONContent} from "@tiptap/core";

interface ITiptapEditor {
    onChange: (str: JSONContent) => void
    value?: JSONContent
}

export default function TiptapEditor({onChange, value }: ITiptapEditor) {


    const editor = useEditor({

        extensions: editorExtensions,

        content: value,

        immediatelyRender: false,

        editorProps: {
            attributes: {
                class: styles.editorInner,
            },
        },
        onUpdate: ({ editor }) => {
            const jsonContent = editor.getJSON();
            onChange?.(jsonContent);
        },
    })


    if (!editor) {
        return null
    }



    return (
        <div className={styles.wrapper}>

            <MenuBar editor={editor}/>
            <BubbleMenu editor={editor}>
                <MenuBar editor={editor}/>
            </BubbleMenu>

            <EditorContent
                editor={editor}
                className={styles.editor}
            />

        </div>
    )
}