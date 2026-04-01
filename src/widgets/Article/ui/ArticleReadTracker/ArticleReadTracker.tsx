'use client';
import React, {useEffect, useRef} from "react";


interface IArticleReadTracker{
    articleId: number
}

export const ArticleReadTracker = ({articleId}: IArticleReadTracker) => {
    const startTime = useRef<number>(Date.now());
    const sendReadTime = () => {
        const readTime = Math.floor((Date.now() - startTime.current) / 1000);
        if (readTime > 3) {
            const blob = new Blob(
                [JSON.stringify({ read_time: readTime })],
                { type: "application/json" }
            )
            navigator.sendBeacon(
                `${process.env.NEXT_PUBLIC_HOST}/api/v1/articles/${articleId}/read-time`,
                blob
            );
        }
    };
    useEffect(() => {
        const handleVisibility = () => {
            if (document.visibilityState === "hidden") {
                sendReadTime();
            }
        };

        window.addEventListener("beforeunload", sendReadTime);
        document.addEventListener("visibilitychange", handleVisibility);

        return () => {
            sendReadTime();
            window.removeEventListener("beforeunload", sendReadTime);
            document.removeEventListener("visibilitychange", handleVisibility);
        };

    }, []);


    return null;
}



