'use client'

import {Editor, useEditorState} from '@tiptap/react'

import styles from './MenuBar.module.css'
import {MenuButton} from "@/shared/ui/Editor/MenuButton/MenuButton";
import {ColorPopover, LegendSelect} from "@/shared/ui";
import React, { useState} from "react";
import Image from "next/image";
import {
    AlignCenterIcon, AlignJustifyIcon,
    AlignLeftIcon, AlignRightIcon,
    BoldIcon,
    ColorIcon,
    HighlightIcon, ImageIcon,
    ItalicIcon, LinkIcon,
    SendIcon,
    StrikeIcon,
    TrashIcon,
    UnderlineIcon
} from "@/shared/assets";


interface IMenuBar {
    editor: Editor
}

const selectElements = [
    {
        id: 'paragraph',
        label: 'Параграф',
    },
    {
        id: 'h1',
        label: 'Заголовок 1',
    },
    {
        id: 'h2',
        label: 'Заголовок 2',
    },
    {
        id: 'h3',
        label: 'Заголовок 3',
    },
]

const selectList = [
    {
        id: 'bulletList',
        label: 'Bullet',
    },
    {
        id: 'orderedList',
        label: 'Ordered',
    },
    {
        id: 'taskList',
        label: 'Task',
    },
]


const selectLanguages = [
    { id: 'plaintext', label: 'Plain text' },

    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' },
    { id: 'jsx', label: 'React JSX' },
    { id: 'ts', label: 'TypeScript' },
    { id: 'tsx', label: 'React TSX' },

    { id: 'java', label: 'Java' },
    { id: 'kotlin', label: 'Kotlin' },

    { id: 'sql', label: 'SQL' },

    { id: 'json', label: 'JSON' },
    { id: 'yaml', label: 'YAML' },

    { id: 'bash', label: 'Bash / Shell' },

    { id: 'dockerfile', label: 'Dockerfile' },
    { id: 'nginx', label: 'Nginx' },

    { id: 'diff', label: 'Diff' },

    { id: 'markdown', label: 'Markdown' },

    { id: 'php', label: 'PHP' },
]



export function MenuBar({editor}: IMenuBar) {
    const [openedPanel, setOpenedPanel] =
        useState<'image' | 'link' | 'color' | 'highlight' | null>(null)

    const [imageSettings, setImageSettings] = useState(
        {
            imageLink: "",
            alt: "",
        }
    )

    const [linkSettings, setLinkSettings] = useState(
        {
            href: "",
        }
    )



    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                // Text formatting
                isBold: ctx.editor.isActive('bold') ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                isHighlight: ctx.editor.isActive('highlight') ?? false,
                isUnderline: ctx.editor.isActive('underline') ?? false,

                // Text alignment
                isAlignLeft: ctx.editor.isActive({textAlign: 'left'}) ?? false,
                isAlignCenter: ctx.editor.isActive({textAlign: 'center'}) ?? false,
                isAlignRight: ctx.editor.isActive({textAlign: 'right'}) ?? false,
                isAlignJustify: ctx.editor.isActive({textAlign: 'justify'}) ?? false,

                // Block types
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isHeading1: ctx.editor.isActive('heading', {level: 1}) ?? false,
                isHeading2: ctx.editor.isActive('heading', {level: 2}) ?? false,
                isHeading3: ctx.editor.isActive('heading', {level: 3}) ?? false,

                // List types
                isBullet: ctx.editor.isActive('bulletList') ?? false,
                isOrdered: ctx.editor.isActive('orderedList') ?? false,
                isTask: ctx.editor.isActive('taskList') ?? false,

                // CodeBlock
                currentLanguage: ctx.editor.getAttributes('codeBlock').language ?? 'plaintext',

                // Color
                color: ctx.editor.getAttributes('textStyle').color,
                highlight: ctx.editor.getAttributes('highlight').highlight,
            }
        },
    })

    const addImage = () => {
        if (imageSettings.imageLink) {
            editor.chain().focus().setImage(
                {
                    src: imageSettings.imageLink,
                    alt: imageSettings.alt,
                    title: imageSettings.alt,

                }

            ).run()
            setImageSettings({imageLink: "", alt: ""});
            setOpenedPanel(null)
        }
    }

    const onClickChangeLink = () => {
        const previousUrl: string = editor.getAttributes('link').href
        setLinkSettings({href: previousUrl})
        if(openedPanel === 'link') {
            setOpenedPanel(null)
        } else {
            setOpenedPanel('link')
        }
    }



    const onClickChangeImage = () => {
        if(openedPanel === 'image') {
            setOpenedPanel(null)
        } else {
            setOpenedPanel('image')
        }
    }

    const onClickChangeColor = () => {
        if(openedPanel === 'color') {
            setOpenedPanel(null)
        } else {
            setOpenedPanel('color')
        }
    }

    const onClickChangeHighlight = () => {
        if(openedPanel === 'highlight') {
            setOpenedPanel(null)
        } else {
            setOpenedPanel('highlight')
        }
    }



    const setLink = () => {

        // cancelled
        if (linkSettings.href === null) {
            return
        }

        // empty
        if (linkSettings.href === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
        }

        // update link
        try {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkSettings.href }).run()
        } catch (e) {
            console.error(e)
        } finally {
            setLinkSettings({href: ''})
            setOpenedPanel(null)
        }
    }

    const unsetLink = () => {
        // cancelled
        if (linkSettings.href === null) {
            return
        }

        // empty
        if (linkSettings.href === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()

            return
        }

        // update link
        try {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
        } catch (e) {
            console.error(e)
        } finally {
            setLinkSettings({href: ''})
            setOpenedPanel(null)
        }
    }



    const handleBlockChange = (id: string) => {

        switch (id) {

            case 'h1':
                editor.chain().focus().toggleHeading({level: 1}).run()
                break

            case 'h2':
                editor.chain().focus().toggleHeading({level: 2}).run()
                break

            case 'h3':
                editor.chain().focus().toggleHeading({level: 3}).run()
                break

            default:
                editor.chain().focus().setParagraph().run()

        }

    }

    const handleListChange = (id: string) => {

        switch (id) {

            case 'orderedList':
                editor.chain().focus().toggleOrderedList().run()
                break

            case 'taskList':
                editor.chain().focus().toggleTaskList().run()
                break

            default:
                editor.chain().focus().toggleBulletList().run()

        }

    }


    const handleLanguageChange = (language: string) => {
        const { from, to } = editor.state.selection
        const text = editor.state.doc.textBetween(from, to, '\n')

        editor
            .chain()
            .focus()
            .insertContentAt(
                { from, to },
                {
                    type: 'codeBlock',
                    attrs: {
                        language,
                    },
                    content: [
                        {
                            type: 'text',
                            text,
                        },
                    ],
                },
            )
            .run()
    }


    const blockTypes = [
        {id: 'h1', active: editorState.isHeading1},
        {id: 'h2', active: editorState.isHeading2},
        {id: 'h3', active: editorState.isHeading3},
    ]

    const listTypes = [
        {id: 'bulletList', active: editorState.isBullet},
        {id: 'orderedList', active: editorState.isOrdered},
        {id: 'taskList', active: editorState.isTask},
    ]



    const currentType =
        blockTypes.find(item => item.active)?.id ?? 'paragraph'

    const currentList =
        listTypes.find(item => item.active)?.id ?? 'bulletList'



    return (

        <div className={styles.toolbar}>
            <ul className={styles.toolbarList}>
                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editorState.isBold}
                    >
                        <Image
                            src={BoldIcon}
                            alt={"bold"}
                            width={20}
                            height={20}
                        />
                    </MenuButton>
                </li>
                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editorState.isItalic}
                    >
                        <Image
                            src={ItalicIcon}
                            alt={"italic"}
                            width={18}
                            height={18}
                        />
                    </MenuButton>
                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        active={editorState.isUnderline}
                    >
                        <Image
                            src={UnderlineIcon}
                            alt={"underline"}
                            width={18}
                            height={18}
                        />
                    </MenuButton>
                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        active={editorState.isStrike}
                    >
                        <Image
                            src={StrikeIcon}
                            alt={"strike"}
                            width={25}
                            height={25}
                        />

                    </MenuButton>
                </li>
                <li className={styles.toolbarItem}>
                    <div className={styles.separator}/>
                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={onClickChangeColor}
                    >
                        <Image
                            src={ColorIcon}
                            alt={"color"}
                            width={20}
                            height={20}
                        />
                    </MenuButton>

                    {openedPanel === 'color' &&
                        <div className={`${styles.inputSetWrapper} ${styles.inputSetWrapperColor}`}>
                            <ColorPopover
                                value={editorState.color ?? '#000000'}
                                unset={() => editor.commands.unsetColor()}
                                onChange={(color) => {
                                    editor
                                        .chain()
                                        .setColor(color)
                                        .run()
                                }}
                            />
                        </div>
                    }


                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={onClickChangeHighlight}
                    >
                        <Image
                            src={HighlightIcon}
                            alt={"highlight"}
                            width={20}
                            height={20}
                        />
                    </MenuButton>

                    {openedPanel === 'highlight' &&
                        <div className={`${styles.inputSetWrapper} ${styles.inputSetWrapperColor}`}>
                            <ColorPopover
                                value={editorState.color ?? '#000000'}
                                unset={() => editor.commands.unsetHighlight()}
                                onChange={(color) => {
                                    editor
                                        .chain()
                                        .setHighlight({color})
                                        .run()
                                }}
                            />
                        </div>
                    }


                </li>



                <li className={styles.toolbarItem}>
                    <div className={styles.separator}/>
                </li>

                <li className={styles.toolbarItem}>
                    <LegendSelect
                        value={currentType}
                        content={selectElements}
                        onChange={handleBlockChange}
                        legend={"Элемент"}
                    />
                </li>
                <li className={styles.toolbarItem}>
                    <LegendSelect
                        value={currentList}
                        content={selectList}
                        onChange={handleListChange}
                        legend={"Список"}
                    />
                </li>
                <li className={styles.toolbarItem}>
                    <div className={styles.separator}/>
                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        active={editorState.isAlignLeft}
                    >
                        <Image
                            src={AlignLeftIcon}
                            alt={"align-left"}
                            width={25}
                            height={25}
                        />

                    </MenuButton>
                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        active={editorState.isAlignCenter}
                    >
                        <Image
                            src={AlignCenterIcon}
                            alt={"align-center"}
                            width={25}
                            height={25}
                        />

                    </MenuButton>
                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        active={editorState.isAlignRight}
                    >
                        <Image
                            src={AlignRightIcon}
                            alt={"align-right"}
                            width={25}
                            height={25}
                        />

                    </MenuButton>
                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}

                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        active={editorState.isAlignJustify}
                    >

                        <Image
                            src={AlignJustifyIcon}
                            alt={"align-justify"}
                            width={20}
                            height={20}
                        />

                    </MenuButton>
                </li>

                <li className={styles.toolbarItem}>
                    <div className={styles.separator}/>
                </li>

                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={onClickChangeLink}
                    >

                        <Image
                            src={LinkIcon}
                            alt={"link"}
                            width={18}
                            height={18}
                        />
                    </MenuButton>
                    {openedPanel === 'link' &&
                        <div className={styles.inputSetWrapper}>
                            <div>
                                <input value={linkSettings.href} onChange={e => setLinkSettings({...linkSettings, href: e.currentTarget.value})} placeholder={"Ссылка"}
                                       className={styles.inputSet} type="text"/>

                            </div>
                            <button onClick={setLink} className={styles.inputSetButton}>
                                <Image width={30} height={30} src={SendIcon} alt={"Отправить"}/>
                            </button>
                            <button onClick={unsetLink} className={styles.inputSetButton}>
                                <Image width={20} height={20} src={TrashIcon} alt={"Отправить"}/>
                            </button>

                        </div>
                    }
                </li>


                <li className={styles.toolbarItem}>
                    <LegendSelect
                        value={editorState.currentLanguage}
                        content={selectLanguages}
                        onChange={handleLanguageChange}
                        legend={'CodeBlock'}
                    />
                </li>

                <li className={styles.toolbarItem}>
                    <div className={styles.separator}/>
                </li>


                <li className={styles.toolbarItem}>
                    <MenuButton
                        className={styles.toolbarBtn}
                        onClick={onClickChangeImage}
                    >

                        <Image
                            src={ImageIcon}
                            alt={"image"}
                            width={18}
                            height={18}
                        />
                    </MenuButton>
                    {openedPanel === 'image' &&
                        <div className={styles.inputSetWrapper}>
                            <div>

                                <input value={imageSettings.imageLink} onChange={e => setImageSettings({...imageSettings, imageLink: e.currentTarget.value})} placeholder={"Ссылка"}
                                       className={styles.inputSet} type="text"/>
                                <input value={imageSettings.alt} onChange={e => setImageSettings({...imageSettings, alt: e.currentTarget.value})} placeholder={"Описание"}
                                       className={styles.inputSet} type="text"/>

                            </div>
                            <button onClick={addImage} className={styles.inputSetButton}>
                                <Image width={30} height={30} src={SendIcon} alt={"Отправить"}/>
                            </button>
                        </div>
                    }
                </li>


            </ul>

        </div>

    )

}