'use client'
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

type useCurrentThemeType = () => string | null

export const useCurrentTheme: useCurrentThemeType = () => {
    const ISSERVER: boolean = typeof window === "undefined";
    const [curTheme, setCurTheme] = useState(  !ISSERVER ? localStorage.getItem('theme') : '')
    const { theme } = useTheme()
    useEffect(() => {
        if(theme) {
            setCurTheme(theme)
        }
    }, [theme])
    return curTheme
}