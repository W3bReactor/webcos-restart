'use client';
import styles from './CookieBanner.module.css'
import React, {useEffect, useState} from "react";
import Link from "next/link";
import {StandardBtn} from "@/shared/ui";

export const CookieBanner = () => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent")
        if (!consent) {
            setVisible(true)
        }
    }, [])

    const acceptAll = () => {
        localStorage.setItem("cookie_consent", "accepted")
        setVisible(false)
        enableAnalytics()
    }

    const acceptNecessary = () => {
        localStorage.setItem("cookie_consent", "necessary")
        setVisible(false)
    }

    const enableAnalytics = () => {
        if (window.ym) return

        const script = document.createElement("script")
        script.src = "https://mc.yandex.ru/metrika/tag.js"
        script.async = true
        document.head.appendChild(script)
    }

    if (!visible) return null

    return (
        <div className={styles.cookieBanner}>
            <p className={styles.desc}>
                Мы используем cookie для работы сайта, аналитики и персонализации рекомендаций.
                Продолжая использовать сайт, вы соглашаетесь с использованием cookie.
            </p>
            <p className={styles.desc}>

                Подробнее — <Link className={styles.link} href={'/cookie-policy'}>в Политике использования cookie</Link>.
            </p>

            <div className={styles.btns}>
                <StandardBtn type={'btn'} onClick={acceptAll}>
                    Принять
                </StandardBtn>
                <StandardBtn type={'btn'} onClick={acceptNecessary}>
                    Только необходимые
                </StandardBtn>
            </div>

        </div>
    );
}
