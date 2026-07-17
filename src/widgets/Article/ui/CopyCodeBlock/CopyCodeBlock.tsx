'use client';

import { useEffect } from 'react';

export const CopyCodeBlock = () => {
    useEffect(() => {
        const buttons = document.querySelectorAll<HTMLButtonElement>(".copy-btn");

        const handlers: Array<() => void> = [];
        buttons.forEach(button => {
            const handler = async () => {
                const code = decodeURIComponent(button.dataset.code ?? "");
                await navigator.clipboard.writeText(code);
            };

            handlers.push(handler);
            button.addEventListener("click", handler);
        });

        return () => {
            buttons.forEach((button, index) => {
                button.removeEventListener("click", handlers[index]);
            });
        };
    }, []);

    return null;
};