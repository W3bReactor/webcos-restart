'use client'
import styles from './ContentSlider.module.css'
import React, {useRef, useState} from "react";
import Image from "next/image";

import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";

import {BlogItem} from "@/entities/BlogItem";
import {WhiteArrowIcon} from "@/shared/assets";
import {IArticle} from "@/widgets/Blog";


interface IContentSlider {
    title: string
    data: IArticle[]
}

export const ContentSlider = ({title, data}: IContentSlider) => {
    const sliderRef = useRef(null);
    const [locked, setLocked] = useState(false);

    return (
        <section className={styles.smallSliderWrapper}>
            <h2 className={styles.smallSliderTitle}>
                {title}
            </h2>
            <div className={styles.smallSliderItem}>
                <Swiper onUnlock={() => setLocked(false)} onLock={() => setLocked(true)} modules={[Autoplay]} ref={sliderRef} spaceBetween='60px' slidesPerView={3} breakpoints={{
                    1024: {
                        spaceBetween: 60,
                        slidesPerView: 3
                    },
                    564: {
                        spaceBetween: 30,
                        slidesPerView: 2
                    },
                    320: {
                        spaceBetween: 30,
                        slidesPerView: 1
                    }
                }} speed={1000} loop={true}  autoplay={{delay: 5000 + 1000 * Math.random()}} >
                    {data.map(item =>
                        <SwiperSlide key={item.id}>
                            <BlogItem id={String(item.id)} title={item.title} image={item.image} description={item.title}/>
                        </SwiperSlide>
                    )}
                </Swiper>
                <div className={`${styles.smallSliderButtons} ${locked ? styles.noSwiping : ""}`}>
                    <button className={styles.smallSliderPrev} onClick={() => sliderRef.current && (sliderRef.current as SwiperRef).swiper.slidePrev()}>
                        <Image src={WhiteArrowIcon} alt={'Предыдущий'}/>
                    </button>
                    <button className={styles.smallSliderNext} onClick={() => sliderRef.current && (sliderRef.current as SwiperRef).swiper.slideNext()} >
                        <Image className={styles.smallSliderNextImage} src={WhiteArrowIcon} alt={'Следующий'}/>
                    </button>
                </div>
            </div>

        </section>

    );
}
