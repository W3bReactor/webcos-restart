'use client'
import Image from "next/image";
import {useTheme} from "next-themes";
import styles from './ThemeToggle.module.css'
import React from "react";
import {MoonIcon, SunIcon} from "@/shared/assets";

interface IThemeToggle {
    className: string
}
export const ThemeToggle = ({className}: IThemeToggle) => {
    const { theme, setTheme } = useTheme()
    const onClickWrapper = (isDark: boolean, event: React.MouseEvent<HTMLButtonElement>) => {
        if(isDark) {
            setTheme('light')
        } else {
            setTheme('dark')
        }
        const html = document.querySelector('html');
        if (html &&
            html.classList.contains('dark')
        ) {
            html.classList.remove('dark');
        } else if (html) {
            html.classList.add('dark');
        }
        const bodyRect = document.body.getBoundingClientRect();
        const elemRect = (event.target as HTMLButtonElement).getBoundingClientRect();
        const offsetTop = elemRect.top - bodyRect.top;
        const offsetLeft = elemRect.left - bodyRect.left;

        const deviceZoomRatio =
            document.documentElement.clientWidth / window.innerWidth;

        const customEventState = {
            x: offsetLeft + elemRect.width / 2,
            y: (deviceZoomRatio > 1 ? offsetTop : elemRect.top) + elemRect.height / 2,
        };

        const darkModeToggleEvent = new CustomEvent('darkModeToggle', {
            detail: customEventState,
        });
        dispatchEvent(darkModeToggleEvent);
    };



    return (
        <div data-on-open-burger='theme' className={`${className ? className : ''}`}>
            <button data-hide-on-theme="dark" className={styles.themeBtn} onClick={(e) => onClickWrapper(theme === 'dark', e )}>
                <Image alt={'moon'} src={MoonIcon}/>
            </button>
            <button data-hide-on-theme="light" className={styles.themeBtn} onClick={(e) => onClickWrapper(theme === 'dark', e )}>
                <Image alt={'sun'} src={SunIcon}/>
            </button>

        </div>
    );
}
