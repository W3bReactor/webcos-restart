'use client'
import styles from './WhoSlider.module.css'
import React, { useRef, useState} from "react";
import Image from "next/image";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import {ArrowIcon, ArrowUnactiveIcon} from "@/widgets/RoadMap";
import {AvatarIcon, CircleIcon} from "@/widgets/Who";

export const WhoSlider = () => {
    const sliderRef = useRef(null);
    const [count, setCount] = useState(1)

    // Обработчик при перелистывании слайда
    const onSlideChange = () => {
        // Делаем для состояния текущий слайд
        if(sliderRef.current) {
            setCount((sliderRef.current as unknown as SwiperRef).swiper.realIndex + 1)
        }
    }


    const handlePrev = () => {
        if (!sliderRef.current) return;
        (sliderRef.current as unknown as SwiperRef).swiper.slidePrev();
        if(count > 1) {
            setCount(count - 1)
        }

    }

    const handleNext = () => {
        if (!sliderRef.current) return;
        (sliderRef.current as unknown as SwiperRef).swiper.slideNext();
        if(count < (sliderRef.current as unknown as SwiperRef).swiper.slides.length) {
            setCount(count + 1)
        }
    }


    return (
        <div className={styles.whoItem}>
            <Swiper onSlideChange={onSlideChange} ref={sliderRef} slidesPerView="auto" speed={1000} spaceBetween='60px' >
                <SwiperSlide>
                    <a className={styles.whoCardLink} target={"_blank"} href={'https://github.com/W3bReactor'}>
                        <div className={styles.whoCardAvatarWrapper}>
                            <Image alt={'Инсаф'} src={CircleIcon} className={styles.whoCardCircle}/>
                            <Image alt={'Обведение'} src={AvatarIcon} className={styles.whoCardAvatar} />
                        </div>
                        <div className={styles.whoCardContent}>
                            <h2 className={styles.whoCardName}>Инсаф</h2>
                            <p className={styles.whoCardPost}>Frontend-Разработчик</p>
                        </div>
                    </a>
                </SwiperSlide>
                <SwiperSlide>
                    <a className={styles.whoCardLink} target={"_blank"} href={'#'}>
                        <div className={styles.whoCardAvatarWrapper}>
                            <Image alt={'Владимир'} src={CircleIcon} className={styles.whoCardCircle}/>
                            <Image alt={'Обведение'} src={AvatarIcon} className={styles.whoCardAvatar} />
                        </div>
                        <div className={styles.whoCardContent}>
                            <h2 className={styles.whoCardName}>Владимир</h2>
                            <p className={styles.whoCardPost}>Backend-Разработчик</p>
                        </div>
                    </a>
                </SwiperSlide>
            </Swiper>
            <div className={styles.whoButtons}>
                <button className={styles.whoPrev} onClick={handlePrev}>
                    {count === 1 ?
                        <Image className={styles.whoPrevImage} src={ArrowUnactiveIcon} alt={'Предыдущий'}/>
                        :
                        <Image className={styles.whoPrevImage} src={ArrowIcon} alt={'Предыдущий'}/>
                    }
                </button>
                <button className={styles.whoNext} onClick={handleNext} >
                    {sliderRef.current && count === (sliderRef.current as unknown as SwiperRef).swiper.slides.length ?
                        <Image src={ArrowUnactiveIcon} alt={'Следующий'}/>
                        :
                        <Image src={ArrowIcon} alt={'Следующий'}/>
                    }
                </button>
            </div>
        </div>

    );
}
