'use client'
import styles from './Planet.module.css'
import React, {useEffect, useRef} from "react";
import {useTheme} from "next-themes";
import {OrbitBlackImage, OrbitImage} from "@/widgets/Intro";


interface IPlanet {
    width: number // диаметр орбиты
    height: number // диаметр орбиты

    planet: string  // изображение планеты

    speed: number // скорость вращения

    planetHeight: number // высота планеты
    planetWidth: number // ширина планеты

    marginRight: number // смещение планеты от края орбиты

    direction: 'right' | 'left' // направление вращения
}

// Компонент планеты с орбитой
export default function Planet(
    {
        height,
        width,
        speed,
        planet,
        planetWidth,
        planetHeight,
        marginRight,
        direction
    }: IPlanet) {

    // ссылка на элемент, который вращается
    const pickerRef = useRef<HTMLDivElement | null>(null);

    // ссылка на орбиту
    const orbitRef = useRef<HTMLDivElement | null>(null);

    // id requestAnimationFrame
    // нужен для остановки анимации при размонтировании компонента
    const animationRef = useRef<number>(0);

    // текущий угол поворота планеты
    // начинаем со случайного положения
    const angleRef = useRef(Math.random() * 360);

    // сейчас планета перетаскивается мышью?
    const isDraggingRef = useRef(false);

    // скорость после броска мышкой
    // используется для эффекта инерции
    const velocityRef = useRef(0);

    /**
     * Вычисляет угол между центром орбиты
     * и текущей позицией мыши.
     * Используется во время drag'n'drop.
     * x, y - координаты мыши
     */
    const getAngle = (x: number, y: number) => {
        if (!orbitRef.current) return 0;

        // элемент орбиты
        const rect = orbitRef.current.getBoundingClientRect();

        // центр орбиты
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // вектор от центра к мыши
        const deltaX = x - centerX;
        const deltaY = y - centerY;

        // переводим радианы в градусы
        /*
        * Что такое Math.atan2 - это угол на который нужно повернуть
        * относительно базовой горизонтальной оси координат
        * для того, чтобы элемент смотрел на курсор
        * Более подробно в статье
        * */
        return (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
    };


    /**
     * Главная анимация вращения.
     *
     * Работает через requestAnimationFrame.
     */
    useEffect(() => {
        // количество миллисекунд с момента начала загрузки страницы
        // (но будет в итоге как время с прошлого кадра)
        let lastTime = performance.now();

        // Анимирование
        const animate = (time: number) => {

            // если вкладка скрыта,
            // просто ждём следующий кадр
            if (document.hidden) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            // сколько миллисекунд прошло с прошлого кадра
            const delta = time - lastTime;

            // обновили на новый кадр
            lastTime = time;


            if (pickerRef.current) {

                // если пользователь НЕ тащит планету
                if (!isDraggingRef.current) {

                    // определяем направление вращения
                    // (т.е просто будем умножать на 1 или на -1)
                    const directionMultiplier =
                        direction === 'left' ? 1 : -1;

                    // вращаем планету (меняем угол)
                    /*
                    * Поймём формулу:
                    * directionMultiplier - просто направление движения
                    * speed - угол на который мы должны повернуть за кадр (при 60 fps)
                    * delta / 16.67 - масштабируем скорость в зависимости от производительности
                    * То есть к примеру 60 fps: 16.67/16.67 = 1 (За кадр повернем ровно на множитель speed)
                    * 30 fps: 33.33/16.67 = 2 (За один кадр мы повернем в 2 раза больше чем множитель speed)
                    * 120 fps: 8.33/16.67 = 0.5 (За один кадр мы повернем в 2 раза меньше чем множитель speed)
                    * В чём суть?
                    * За одну секунду реального времени объект повернется на абсолютно одинаковый угол, что на мощном пк,
                    * что и на слабом пк
                    * На слабом пк скорость изменения в 2 раза больше ЗА ОДИН КАДР, но самих КАДРОВ тоже меньше в 2 раза:
                    * по итогу получаем абсолютно одинаковое поведение как на мощном, так и на слабом пк за секунду времени
                    * 16.67 - просто длительность кадра при эталонных 60 FPS
                    * */

                    angleRef.current +=
                        directionMultiplier *
                        speed * // speed - угол на который объект должен повернуться за кадр
                        (delta / 16.67);

                    // добавляем инерцию
                    angleRef.current += velocityRef.current;

                    // Если инерция стала слишком мала, зануляем её, чтобы не тратить ресурсы
                    if (Math.abs(velocityRef.current) < 0.001) {
                        velocityRef.current = 0;
                    }

                    // постепенно гасим скорость
                    velocityRef.current *= 0.96;
                }

                //  вращаем планету
                pickerRef.current.style.transform =
                    `rotate(${angleRef.current}deg)`;

            }

            // переходим к следующему кадру
            animationRef.current =
                requestAnimationFrame(animate);
        };

        // запуск анимации
        animationRef.current =
            requestAnimationFrame(animate);

        // очистка при удалении компонента
        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [direction, speed]);


    /**
     * Обработка drag'n'drop
     */
    useEffect(() => {

        // функция, которая будет работать при изменении позиции мыши
        const handleMouseMove = (e: MouseEvent) => {

            // проверяем захвачен ли элемент
            if (
                !isDraggingRef.current ||
                !pickerRef.current
            ) {
                return;
            }

            // новый угол относительно центра орбиты
            const angle =
                getAngle(e.clientX, e.clientY);

            // вычисляем скорость броска
            velocityRef.current =
                (angle - angleRef.current) * 0.12; // каждый кадр будем преодолевать только 12% от оставшегося расстояния (для плавности)

            // обновляем угол
            angleRef.current = angle;

            // сразу отображаем новое положение
            pickerRef.current.style.transform =
                `rotate(${angle}deg)`;
        };

        const handleMouseUp = () => {

            // прекращаем перетаскивание
            isDraggingRef.current = false;

            document.body.style.cursor = '';
        };

        window.addEventListener(
            'mousemove',
            handleMouseMove
        );

        window.addEventListener(
            'mouseup',
            handleMouseUp
        );

        return () => {
            window.removeEventListener(
                'mousemove',
                handleMouseMove
            );

            window.removeEventListener(
                'mouseup',
                handleMouseUp
            );
        };
    }, []);


    /**
     * Начало перетаскивания
     */
    const handleMouseDown = (
        e: React.MouseEvent
    ) => {

        e.preventDefault();

        isDraggingRef.current = true;

        // сбрасываем прошлую инерцию
        velocityRef.current = 0;
    };


    const {resolvedTheme} = useTheme()
    let src

    switch (resolvedTheme) {
        case 'light':
            src = OrbitBlackImage.src
            break
        case 'dark':
            src = OrbitImage.src
            break
        default:
            src = OrbitImage.src
            break
    }
    return (
        <div style={{
            backgroundImage: `url(${src})`,
            width: `${width}px`,
            height: `${height}px`,
        }}
             ref={orbitRef}
             className={styles.orbitInner}
        >
            {/* Вращающаяся часть орбиты */}
            <div
                ref={pickerRef}
                className={styles.picker}
            >
                {/* Планета */}
                <div
                    style={{
                        width: `${planetWidth}px`,
                        height: `${planetHeight}px`,
                        marginRight: `${marginRight}px`,
                        backgroundImage: `url(${planet})`,

                    }}
                    onMouseDown={handleMouseDown}

                    className={styles.innerOrbitCircle}
                />
            </div>
        </div>

    );
}
