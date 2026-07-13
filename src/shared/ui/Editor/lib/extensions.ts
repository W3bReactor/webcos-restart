import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import FileHandler from "@tiptap/extension-file-handler";


import {TextStyle} from "@tiptap/extension-text-style";
import {TaskItem, TaskList} from "@tiptap/extension-list";

import { lowlight } from './lowlight'



export const editorExtensions = [
    StarterKit.configure({
        codeBlock: false,
        link: false
    }),

    Placeholder.configure({
        placeholder: 'Начните писать статью...',
    }),

    // Underline,

    Highlight.configure({
        multicolor: true,
    }),

    Link.configure({
        openOnClick: false,
        autolink: true,
    }),

    Image.configure({
        resize: {
            enabled: true,
            directions: ['top', 'bottom', 'left', 'right'], // can be any direction or diagonal combination
            minWidth: 50,
            minHeight: 50,
            alwaysPreserveAspectRatio: true,
        },
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
            loading: 'lazy'
        }

    }),

    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),


    FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
            files.forEach(file => {
                const fileReader = new FileReader()

                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    currentEditor
                        .chain()
                        .insertContentAt(pos, {
                            type: 'image',
                            attrs: {
                                src: fileReader.result,
                            },
                        })
                        .focus()
                        .run()
                }
            })
        },
        onPaste: (currentEditor, files) => {
            files.forEach(file => {
                const fileReader = new FileReader()

                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    currentEditor
                        .chain()
                        .insertContentAt(currentEditor.state.selection.anchor, {
                            type: 'image',
                            attrs: {
                                src: fileReader.result,
                            },
                        })
                        .focus()
                        .run()
                }
            })
        },
    }),


    CodeBlockLowlight.configure({
        lowlight,
        enableTabIndentation: true,
        defaultLanguage: 'plaintext',
    }),

    TextStyle,
    TaskItem.configure({
        nested: true,
    }),
    TaskList,
]