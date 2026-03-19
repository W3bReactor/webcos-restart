'use client'
import React, {useEffect, useRef, useState} from 'react';
import styles from './ThemeAnimation.module.css'
import {useTheme} from "next-themes";
import {debounce, throttle} from "@/shared/lib";


type TNumber = number
type StateMachineAction = () => StateMachineStep;
type StateMachineStep = StateMachineAction | Promise<StateMachineAction> | null;

const COLORS = {
    white: '#FFF',
    midnightBlack: '#121A2E',
};

const RADIUS_GROWTH_PER_MS = 0.025;
const GROWTH_FUNCTION_EXPONENTIAL = 2.9;
const PIXEL_SCALING_FACTOR = 0.5;

const circleCenterCoordinates = {
    x: null as number | null,
    y: null as number | null,

    resetMouseState: () => {
        circleCenterCoordinates.x = null;
        circleCenterCoordinates.y = null;
    },
};


const m = {
    ctx: null as null | CanvasRenderingContext2D,
    isDark: null as null | boolean,
    radiusMultiplier: 0 as TNumber,
    maxRadiusMultiplier: 0 as TNumber,
    timeAtPreviousDraw: 0 as TNumber ,
    height: 0 as TNumber,
    width: 0 as TNumber,

    createMachine: (ctx: CanvasRenderingContext2D, isDark: boolean | null): StateMachineAction => {
        m.ctx = ctx;
        m.isDark = isDark;
        m.height = Math.max(window.screen.height, window.innerHeight);
        m.width = Math.max(window.screen.width, window.innerWidth);
        m.maxRadiusMultiplier =
            Math.max(m.width as number, m.height as number) ** (1.0 / GROWTH_FUNCTION_EXPONENTIAL);
        m.timeAtPreviousDraw = Date.now();
        console.log(document.body.style.background)
        document.body.style.background = m.isDark
            ? COLORS.midnightBlack
            : COLORS.white;

        const { width, height } = m.ctx.canvas.getBoundingClientRect();
        if (m.ctx.canvas.width !== width || m.ctx.canvas.height !== height) {
            const { devicePixelRatio: originalRatio = 1 } = window;
            const lowerResolutionRatio = originalRatio * PIXEL_SCALING_FACTOR;
            m.ctx.canvas.width = width * lowerResolutionRatio;
            m.ctx.canvas.height = height * lowerResolutionRatio;
            m.ctx.scale(lowerResolutionRatio, lowerResolutionRatio);
        }

        if (
            circleCenterCoordinates.x == null ||
            circleCenterCoordinates.y == null
        ) {
            m.radiusMultiplier = isDark ? 0 : m.maxRadiusMultiplier;
        }



        return m.start;
    },
    start: (): StateMachineAction => {
        if (m.isDark === null) return () => null;
        return m.isDark ? m.shrinkCircle : m.growCircle;
    },

    growCircle: (): StateMachineAction => {
        m.radiusMultiplier +=
            RADIUS_GROWTH_PER_MS * Math.max(1, Date.now() - m.timeAtPreviousDraw || 0);
        return m.verifyCircleBounds;
    },

    shrinkCircle: (): StateMachineAction => {
        m.radiusMultiplier -=
            RADIUS_GROWTH_PER_MS * Math.max(1, Date.now() - m.timeAtPreviousDraw);
        return m.verifyCircleBounds;
    },

    verifyCircleBounds: (): StateMachineAction => {
        if (
            (m.radiusMultiplier <= 0 && m.isDark) ||
            (m.radiusMultiplier >= m.maxRadiusMultiplier && !m.isDark)
        ) {
            (m.ctx as CanvasRenderingContext2D).fillStyle = m.isDark ? COLORS.midnightBlack : COLORS.white;
            (m.ctx as CanvasRenderingContext2D).fillRect(0, 0, m.width, m.height);
            m.radiusMultiplier = m.isDark ? 0 : m.maxRadiusMultiplier;
            return () => null;
        }

        (m.ctx as CanvasRenderingContext2D).clearRect(0, 0, m.width, m.height);
        return m.drawCircle;
    },

    drawCircle: (): StateMachineAction => {
        (m.ctx as CanvasRenderingContext2D).fillStyle = COLORS.white;
        (m.ctx as CanvasRenderingContext2D).beginPath();
        (m.ctx as CanvasRenderingContext2D).arc(
            circleCenterCoordinates.x as number,
            circleCenterCoordinates.y as number,
            m.radiusMultiplier ** GROWTH_FUNCTION_EXPONENTIAL,
            0,
            2 * Math.PI
        );
        (m.ctx as CanvasRenderingContext2D).fill();

        m.timeAtPreviousDraw = Date.now();
        return () => new Promise<StateMachineAction>(resolve => {
            window.requestAnimationFrame(() => resolve(m.start));
        });
    },
};


export const ThemeAnimation = () =>  {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const canvasRef = useRef<HTMLCanvasElement | null>(null);


    useEffect(() => {
        type StateMachineAction = () => StateMachineStep;
        type StateMachineStep = StateMachineAction | Promise<StateMachineAction> | null;

        let handleClick: (event: { detail: { x: number; y: number } }) => void;
        let handleResize: () => void;
        let isStateMachinePowered = true;

        if (mounted && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            let currentStep: StateMachineStep = null;

            if (ctx) {
                // Инициализация state machine
                currentStep = (() => {
                    m.ctx = ctx;
                    m.isDark = theme === 'dark';
                    m.height = Math.max(window.screen.height, window.innerHeight);
                    m.width = Math.max(window.screen.width, window.innerWidth);
                    m.maxRadiusMultiplier =
                        Math.max(m.width, m.height) ** (1.0 / GROWTH_FUNCTION_EXPONENTIAL);
                    m.timeAtPreviousDraw = Date.now();

                    document.body.style.background = m.isDark
                        ? COLORS.midnightBlack
                        : COLORS.white;

                    const { width, height } = ctx.canvas.getBoundingClientRect();
                    if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
                        const { devicePixelRatio: originalRatio = 1 } = window;
                        const lowerResolutionRatio = originalRatio * PIXEL_SCALING_FACTOR;
                        ctx.canvas.width = width * lowerResolutionRatio;
                        ctx.canvas.height = height * lowerResolutionRatio;
                        ctx.scale(lowerResolutionRatio, lowerResolutionRatio);
                    }

                    if (circleCenterCoordinates.x === null || circleCenterCoordinates.y === null) {
                        m.radiusMultiplier = m.isDark ? 0 : m.maxRadiusMultiplier;
                    }

                    return m.start;
                })();
            }

            const runStep = (step: StateMachineStep) => {
                if (!isStateMachinePowered || !step) return;

                const executeStep = (nextStep: StateMachineStep) => {
                    if (nextStep instanceof Promise) {
                        nextStep.then(promisedStep => {
                            if (isStateMachinePowered) {
                                runStep(promisedStep);
                            }
                        }).catch(console.error);
                    } else {
                        runStep(nextStep);
                    }
                };

                if (typeof step === 'function') {
                    try {
                        const nextStep = step();
                        executeStep(nextStep);
                    } catch (error) {
                        console.error('State machine error:', error);
                    }
                } else {
                    executeStep(step);
                }
            };

            if (currentStep) {
                runStep(currentStep);
            }

            handleClick = (event: { detail: { x: number; y: number } }) => {
                circleCenterCoordinates.x = event.detail.x;
                circleCenterCoordinates.y = event.detail.y;
            };

            handleResize = () => {
                circleCenterCoordinates.resetMouseState();
                if (ctx) {
                    currentStep = (() => {
                        m.ctx = ctx;
                        m.height = Math.max(window.screen.height, window.innerHeight);
                        m.width = Math.max(window.screen.width, window.innerWidth);
                        m.maxRadiusMultiplier =
                            Math.max(m.width, m.height) ** (1.0 / GROWTH_FUNCTION_EXPONENTIAL);
                        return m.start;
                    })();
                    if (currentStep) {
                        runStep(currentStep);
                    }
                }
            };

            window.addEventListener('darkModeToggle', handleClick as () => void);
            window.addEventListener('resize', throttle(debounce(handleResize, 100)), false);
        }

        return () => {
            isStateMachinePowered = false;
            window.removeEventListener('darkModeToggle', handleClick as () => void);
            window.removeEventListener('resize', throttle(debounce(handleResize, 100)), false);
        };
    }, [theme, mounted]);

    return <canvas className={styles.circle} ref={canvasRef} />;
};


