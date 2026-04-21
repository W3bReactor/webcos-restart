"use client";

import styles from './Modal.module.css'
import React, {useEffect, useState} from "react";
import {createPortal} from "react-dom";
interface IModal {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void
}

export const Modal = ({ children, isOpen, onClose }: IModal) => {
    const [mounted, setMounted] = useState(false);
    console.log(isOpen)
    useEffect(() => {
        const html = document.querySelector("html");
        if(html) {
            if (isOpen) {
                html.style.overflow = "hidden";
            } else {
                html.style.overflow = "";
            }
        }
        if(!mounted) {
            setMounted(true);
        }
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            {children}
        </div>,
        document.body
    );
};