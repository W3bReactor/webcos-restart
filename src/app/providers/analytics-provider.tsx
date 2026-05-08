"use client";
import {useEffect, useState} from "react";
import {YandexMetrika} from "@/shared/lib";



export const AnalyticsProvider = () => {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const accepted =
            localStorage.getItem("cookie_consent") === "accepted";
        setEnabled(accepted);
    }, []);

    if (!enabled) return null;

    return <YandexMetrika />;
};