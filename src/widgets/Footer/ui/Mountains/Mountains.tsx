'use client'
import styles from './Mountains.module.css'
import React, { useEffect, useRef} from "react";
import {drawMountain} from "@/widgets/Footer/lib/canvas/canvas";

export const Mountains = () => {
    const canvasMountainsRef = useRef<null | HTMLCanvasElement>(null);



    useEffect(() => {
        const canvasMountains = canvasMountainsRef.current;
        if (canvasMountains) {
            const context = canvasMountains.getContext('2d');
            if (context) {
                // Задние горы
                drawMountain(
                    context,
                    0, 420,   // Левое основание
                    100, 230,  // Вершина
                    200, 420,  // Правое основание
                    'rgba(88, 45, 91, 0.5)', // Цвет горы
                    'rgba(206, 234, 246, 0.6)', // Цвет снега
                    80        // Ширина снега
                );
                drawMountain(
                    context,
                    325, 420,   // Левое основание
                    600, 75,  // Вершина
                    875, 420,  // Правое основание
                    'rgba(88, 45, 91, 0.4)', // Цвет горы
                    'rgba(206, 234, 246, 0.5)', // Цвет снега
                    130        // Ширина снега
                );
                drawMountain(
                    context,
                    765, 420,   // Левое основание
                    1050, 85,  // Вершина
                    1335, 420,  // Правое основание
                    'rgba(88, 45, 91, 0.4)', // Цвет горы
                    'rgba(206, 234, 246, 0.5)', // Цвет снега
                    130        // Ширина снега
                );
                drawMountain(
                    context,
                    1050, 420,   // Левое основание
                    1300, 130,  // Вершина
                    1550, 420,  // Правое основание
                    'rgba(88, 45, 91, 0.4)', // Цвет горы
                    'rgba(206, 234, 246, 0.5)', // Цвет снега
                    140        // Ширина снега
                );

                drawMountain(
                    context,
                    1500, 420,   // Левое основание
                    1750, 140,  // Вершина
                    2000, 420,  // Правое основание
                    'rgba(88, 45, 91, 0.4)', // Цвет горы
                    'rgba(206, 234, 246, 0.5)', // Цвет снега
                    140        // Ширина снега
                );

                // Гора на переднем плане
                drawMountain(
                    context,
                    70, 420,   // Левое основание
                    300, 150,  // Вершина
                    530, 420,  // Правое основание
                    '#572D5B', // Цвет горы
                    '#CEEAF6', // Цвет снега
                    140        // Ширина снега
                );
                drawMountain(
                    context,
                    455, 420,   // Левое основание
                    800, 0,  // Вершина
                    1160, 420,  // Правое основание
                    '#572D5B', // Цвет горы
                    '#CEEAF6', // Цвет снега
                    130        // Ширина снега
                );
                drawMountain(
                    context,
                    1180, 420,   // Левое основание
                    1500, 50,  // Вершина
                    1820, 420,  // Правое основание
                    '#572D5B', // Цвет горы
                    '#CEEAF6', // Цвет снега
                    140        // Ширина снега
                );

            }

        }
        return () => {
            if (canvasMountains) {
                const context = canvasMountains.getContext('2d');
                if(context) {
                    context.reset()
                }
            }
        }
    }, []);


    return (
        <canvas width={2000} height={420} ref={canvasMountainsRef} className={styles.mountains}>
        </canvas>
    );
}
