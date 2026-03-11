'use client'
import styles from './Burger.module.css'
import React, {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

export const Burger = () => {
    const [openBurger, setOpenBurger] = useState(false)
    const pathname = usePathname()
    useEffect(() => {
        const html = document.querySelector('html')
        if(html) {
            html.setAttribute('data-burger', "close")
        }

    }, [pathname])
    const onClickBurger = () => {
        const html = document.querySelector('html')
        if(html) {
            if(openBurger) {
                html.setAttribute('data-burger', "close")

            } else {
                html.setAttribute('data-burger', "open")
            }
        }
        setOpenBurger(!openBurger)
    }
    return (
        <button className={styles.headerBurgerBtn} onClick={onClickBurger } >
            <div className={`${styles.headerBurger} ${openBurger ? styles.headerBurgerOpen : ''}`}>

            </div>
        </button>

    );
}
