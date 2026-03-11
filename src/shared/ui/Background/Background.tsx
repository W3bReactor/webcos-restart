'use client';

import React, {useEffect, useRef} from "react";
import styles from "./Background.module.css";
import {getRandomNumber} from "@/shared/lib";

const params = {
    amount: 300,
    size: {
        min: 1,
        max: 2,
        giant: 3
    },
    duration: {
        min: 5,
        max: 25,
    }
}


const randomBetween = (a: number, b: number) => {
    return (a + (Math.random() * (b - a)));
}

interface IStar {
    x: number,
    y: number,
    size: number
    opacity: number
    duration: number
    direction: boolean // Вверх - true Вниз - false
}

let elements: IStar[] = []

export const Background = () =>  {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const gradientCanvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const draw = () => {
            const height = window.innerHeight;
            const width = window.innerWidth;
            if(!canvasRef.current) {
                return
            }
            const ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d')
            if(ctx) {
                ctx.clearRect(0, 0, width, height);
                ctx.beginPath()
                ctx.fillStyle = `rgba(255, 255, 255, 1)`;
                for(let i = 0; i < elements.length; i++) {
                    if(elements[i].opacity <= 0) {
                        elements[i].direction = true
                    } else if (elements[i].opacity >= 1) {
                        elements[i].direction = false
                    }
                    if(elements[i].opacity <= 0) {
                        elements[i].x = randomBetween(0, width)
                        elements[i].y = randomBetween(0, height);

                    }

                    ctx.moveTo(elements[i].x+(elements[i].size * Math.abs(elements[i].opacity * 1.5) * Math.random()),elements[i].y)
                    ctx.arc(elements[i].x, elements[i].y, elements[i].size * Math.abs(elements[i].opacity), 0, 2 * Math.PI, false);
                    if(elements[i].direction) {
                        elements[i].opacity = elements[i].opacity + 1 / (elements[i].duration * elements[i].duration * 2)
                    } else {
                        elements[i].opacity = elements[i].opacity - 1 / (elements[i].duration * elements[i].duration * 2)
                    }

                }

                ctx.fill();

            }

            setTimeout(draw,1000/60);

        }
        const ctx = (canvasRef.current as HTMLCanvasElement).getContext('2d')
        if(ctx) {
            const height = window.innerHeight;
            const width = window.innerWidth;
            ctx.canvas.height = height
            ctx.canvas.width = width
            ctx.canvas.style.filter = "blur(1px)"
            elements = []

            for(let i = 0; i < params.amount; i++) {
                // Настройка случайного положения элементов
                const size = Math.round(Math.random() * 10) === 0 ? params.size.giant : randomBetween(params.size.min, params.size.max);
                const xPos = randomBetween(0, width)
                const yPos = randomBetween(0, height)

                elements = [...elements,
                    {
                        x: xPos,
                        y: yPos,
                        size: size,
                        opacity: Math.random(),
                        duration: getRandomNumber(params.duration.min, params.duration.max),
                        direction: false
                    }
                ]
            }

            draw()
        }

    }, []);

    return <>
        <canvas data-hide-on-theme="dark" className={styles.backgroundGradient} ref={gradientCanvasRef} />
        <canvas className={styles.background} ref={canvasRef} />
    </>
};