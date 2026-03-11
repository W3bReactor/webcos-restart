'use client'
import styles from './Slider.module.css'
import React, {useRef, useState} from "react";
import Image from "next/image";
import {SwiperRef, Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper/modules";
import {SliderArrowIcon} from "@/shared/assets";
import 'swiper/css/autoplay';
import Link from "next/link";
import {IBanner} from "@/widgets/Slider";

interface ISlider {
    data: IBanner[]
}

export const Slider  = ({data}: ISlider) => {
    const sliderRef = useRef(null);
    const [locked, setLocked] = useState(false);

    return (
        <section className={styles.sliderWrapper}>
            <Swiper onUnlock={() => setLocked(false)} onLock={() => setLocked(true)} modules={[Autoplay]} ref={sliderRef} slidesPerView={1} speed={1000} loop={true} spaceBetween='60px' autoplay={{
                delay: 5000
            }}>
                {data.map(item =>
                    <SwiperSlide key={item.id}>
                        <Link className={styles.sliderLink} href={'#'}>
                            {item.image &&
                                <Image className={styles.sliderImage} alt={item.title} width={"1200"} height={"411"}  src={item.image}/>
                            }
                            <div className={styles.sliderContent}>
                                <p className={styles.sliderInfo}>{item.suptitle}</p>
                                <h2 className={styles.sliderTitle}>{item.title}</h2>
                                <button className={styles.sliderBtn}>{item.btn_name}</button>
                            </div>
                        </Link>
                    </SwiperSlide>
                )}
            </Swiper>
            <div className={`${styles.sliderButtons} ${locked ? styles.noSwiping : ""}`}>
                <button className={styles.sliderPrev} onClick={() => (sliderRef.current as unknown as SwiperRef).swiper.slidePrev()}>
                    <Image src={SliderArrowIcon} alt={'Предыдущий'}/>
                </button>
                <button className={styles.sliderNext} onClick={() => (sliderRef.current as unknown as SwiperRef).swiper.slideNext()} >
                    <Image className={styles.sliderNextImage} src={SliderArrowIcon} alt={'Следующий'}/>
                </button>
            </div>

        </section>

    );
}
