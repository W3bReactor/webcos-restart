'use client'
import styles from './Road.module.css'
import React, { useEffect, useRef, useState} from "react";
import Image from "next/image";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import { FreeMode, Navigation } from 'swiper/modules';

import {ArrowIcon, ArrowUnactiveIcon, IStory, StageActiveIcon, StageIcon} from "@/widgets/RoadMap";



export const Road = ({ data }: { data: IStory[] }) => {
    const sliderRef = useRef<SwiperRef | null>(null);
    const [mounted, setMounted] = useState(false)
    const [count, setCount] = useState(1)

    // Обработчик при перелистывании слайда
    const onSlideChange = () => {
        // Делаем для состояния текущий слайд
        if(sliderRef.current) {
            setCount((sliderRef.current as unknown as SwiperRef).swiper.realIndex + 1)
        }
        const allSlides = document.querySelectorAll(`.road__item-card`);
        // Удаление классов у активного слайда (Можно оптимизировать)
        for (let i = 0; i < allSlides.length; i++) {
            allSlides[i].classList.remove(styles.roadItemCardActive)
        }
        // Нахождение текущего элемента и добавление для него класса
        const nextEl = document.querySelector(`.swiper-slide-${(sliderRef.current as unknown as SwiperRef).swiper.realIndex + 1} .road__item-card`);
        if(nextEl) {
            nextEl.classList.add(styles.roadItemCardActive)
        }
    }


    useEffect(() => {
        setMounted(true)
        // Добавление класса для первого слайда
        if(sliderRef.current && mounted && data) {
            const first = document.querySelector(`.swiper-slide-1 .road__item-card`);
            if(first) {
                first?.classList?.add(styles.roadItemCardActive)
            }
        }
    }, [mounted, data])
    // Обработчик событий при нажатии на стрелку (Предыдущий слайд)
    const handlePrev = () => {
        if (!sliderRef.current) return;
        // Попытка изменить слайд через встроенный в библиотеку обработчик
        (sliderRef.current as unknown as SwiperRef).swiper.slidePrev();
        // count - активный слайд, проверка не является ли слайд первым
        if(count > 1) {
            const allSlides = document.querySelectorAll(`.road__item-card`);
            // Удаление классов у активного слайда (Можно оптимизировать)
            for (let i = 0; i < allSlides.length; i++) {
                allSlides[i].classList.remove(styles.roadItemCardActive)
            }
            // Нахождение предыдущего элемента и изменение текущего активного слайда
            const prevEl = document.querySelector(`.swiper-slide-${count - 1} .road__item-card`);
            setCount(count - 1)
            if(prevEl) {
                prevEl.classList.add(styles.roadItemCardActive)
            }

        }
    }
    // Обработчик событий при нажатии на стрелку (Следующий слайд)
    const handleNext = () => {
        if (!sliderRef.current) return;
        // Попытка изменить слайд через встроенный в библиотеку обработчик
        (sliderRef.current as unknown as SwiperRef).swiper.slideNext();
        // count - активный слайд, проверка не является ли слайд первым
        if(count < (sliderRef.current as unknown as SwiperRef).swiper.slides.length) {
            const allSlides = document.querySelectorAll(`.road__item-card`);
            // Удаление классов у активного слайда (Можно оптимизировать)
            for (let i = 0; i < allSlides.length; i++) {
                allSlides[i].classList.remove(styles.roadItemCardActive)
            }
            // Нахождение следующего элемента и изменение текущего активного слайда
            const nextEl = document.querySelector(`.swiper-slide-${count + 1} .road__item-card`);
            if(nextEl) {
                nextEl.classList.add(styles.roadItemCardActive)
            }
            setCount(count + 1)
        }
    }



    return (
        <Swiper
            modules={[Navigation, FreeMode]}
            className={styles.roadList}
            speed={1000}
            slidesPerView={6}
            navigation={false}
            spaceBetween={"30px"}
            ref={sliderRef}
            onSlideChange={onSlideChange}
            breakpoints={{
                1024: {
                    width: 1024,
                    slidesPerView: 6
                },
                796: {
                    width: 796,
                    slidesPerView: 3
                },
                564: {
                    width: 564,
                    slidesPerView: 2
                },
                320: {
                    width: 320,
                    slidesPerView: 1
                }
            }}


        >
            {data.map((item, id) =>
                <SwiperSlide key={item.id} className={`${styles.roadItem} swiper-slide-${id+1}`}>
                            <div className={`${styles.roadItemCard} road__item-card`}>
                                <h4 className={styles.roadItemTitle}>{item.year}</h4>
                                <p className={styles.roadItemDesc}>{item.title}</p>
                                <p className={styles.roadItemDescBottom}>{item.title_continue}</p>

                                <div className={styles.roadItemButtons}>
                                    <button className={styles.roadItemPrev} onClick={handlePrev}>
                                        {count === 1
                                            ?
                                            <Image className={styles.roadItemPrevImage} src={ArrowUnactiveIcon} alt={'Предыдущий'}/>
                                            :
                                            <Image className={styles.roadItemPrevImage} src={ArrowIcon} alt={'Предыдущий'}/>

                                        }
                                    </button>
                                    <button className={styles.roadItemNext} onClick={handleNext} >
                                        { (sliderRef.current as unknown as SwiperRef)?.swiper?.slides.length &&
                                        count === (sliderRef.current as unknown as SwiperRef).swiper.slides.length
                                            ?
                                            <Image src={ArrowUnactiveIcon} alt={'Следующий'}/>
                                            :
                                            <Image src={ArrowIcon} alt={'Следующий'}/>

                                        }

                                    </button>

                                </div>
                            </div>
                            <div className={styles.roadItemContent}>
                                {count === item.id
                                    ?
                                    <Image className={styles.roadItemImageActive} src={StageActiveIcon} alt={'Стадия'}/>
                                    :
                                    <Image className={styles.roadItemImage} src={StageIcon} alt={'Стадия'}/>

                                }
                                <h3 className={styles.roadItemTitleMain}>{item.year}</h3>
                                <p className={styles.roadItemDescPreview}>{item.title}</p>
                            </div>

                </SwiperSlide>

            )}
        </Swiper>


    );
}
