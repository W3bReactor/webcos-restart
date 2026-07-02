"use client"
import styles from './AccordionItem.module.css'
import React, {useEffect, useRef, useState} from "react";

interface IAccordionItem {
    title: string;
    desc: string;
    className?: string;

}

export const AccordionItem = ({title, desc, className}: IAccordionItem) => {
    const [opened, setOpened] = useState(false)
    const ref = useRef<null | HTMLParagraphElement>(null)
    useEffect(() => {
        if(ref.current) {
            if(opened) {
                // высота элемента + высота сверху и снизу margin'ов (25+16)
                ref.current.style.height = `${ref.current.scrollHeight + 41}px`
            } else {
                ref.current.style.height = `0`


            }
        }
    }, [opened]);


    return (
        <li className={`${styles.accordionItem} ${className ? className : ''}}`}>
            <div onClick={() => setOpened(!opened)} className={styles.accordionItemTop}>
                <h2 className={styles.accordionItemTitle}>{title}</h2>
                <button className={`${styles.accordionItemDropdown} ${opened ? styles.accordionItemDropdownActive : ""} `}/>
            </div>
            <p ref={ref} className={`${styles.accordionItemDesc} ${opened ? styles.accordionItemDescActive : ""}`}>{desc}</p>
        </li>
    );
}
