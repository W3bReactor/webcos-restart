'use client';
import styles from './CookieBanner.module.css'
import React, {useEffect, useState} from "react";


interface ICardTitle {
    children: React.ReactNode;
    className?: string;
}

// TODO: Сделать баннер для куки
export const CookieBanner = ({children, className}: ICardTitle) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) setVisible(true);
    }, []);

    const accept = () => {
        localStorage.setItem("cookie_consent", "true");
        setVisible(false);
    };

    if (!visible) return null;


    return (
        <div className="cookieBanner">
            <p>
                Мы используем cookie для аналитики и персонализации рекомендаций.
            </p>

            <button onClick={accept}>
                Принять
            </button>
        </div>
    );
}
