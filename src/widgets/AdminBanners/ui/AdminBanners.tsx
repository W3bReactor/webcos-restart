'use client'
import React, {useRef, useState} from "react";
import styles from './AdminBanners.module.css'
import { PurpleBtn, RedBtn} from "@/shared/ui";
import Link from "next/link";
import {MoonIcon, PlusIcon, SliderArrowIcon} from "@/shared/assets";
import {Swiper, SwiperRef, SwiperSlide} from "swiper/react";
import Image from "next/image";
import {IBanner} from "@/widgets/Slider";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {deleteBannerApi} from "@/shared/api/banners/bannersApi";



interface IAdminBanners {
    type: 'articles' | 'projects'
    items: IBanner[];
}

export const AdminBanners = ({type, items}: IAdminBanners) => {
    const sliderRef = useRef(null);
    const [locked, setLocked] = useState(false);
    const { data: responseDelete,  trigger: deleteBanner} = useSWRMutation<
        ApiResult<string>,
        Error,
        "articles/delete",
        number
    >(
        "articles/delete",
        (_, { arg }) => deleteBannerApi(arg)
    )

    const onDelete = async (id: number) => {
        await deleteBanner(id)
    }
    return (
        <>
            <div className={styles.adminBannersTop}>
                <h2 className={styles.adminBannersTitle}>Баннеры:</h2>
                <Link href={`/admin/${type}/banners/create`}>
                    <Image src={PlusIcon} alt={'Добавить новый баннер'}/>
                </Link>
            </div>
            <div className={styles.adminBannersItem}>
                <Swiper onUnlock={() => setLocked(false)} onLock={() => setLocked(true)} wrapperClass={styles.adminBannersSwiper} ref={sliderRef} slidesPerView={2} speed={1000} spaceBetween='60px'>
                    {items.map(banner =>
                        <SwiperSlide>
                            <div className={styles.adminBannersItemWrapper} >
                                <div className={styles.adminBannersImageWrapper}>
                                    {banner.image ?
                                        <Image width={358} height={162} className={styles.adminBannersImage} alt={banner.title} src={banner.image}/>
                                    :
                                        <Image width={358} height={162} className={styles.adminBannersImage} alt={banner.title} src={MoonIcon}/>

                                    }
                                    <div className={styles.adminBannersInstruments}>
                                        <PurpleBtn href={`/admin/${type}/banners/edit/${banner.id}`} type={'site-link'} >Изменить</PurpleBtn>
                                        <RedBtn onClick={() => onDelete(banner.id)} type={'btn'} className={styles.adminBannersDelete}>Удалить</RedBtn>
                                    </div>
                                </div>
                                <div className={styles.adminBannersContent}>
                                    <p className={styles.adminBannersInfo}>Надзаголовок: {banner.suptitle}</p>
                                    <p className={styles.adminBannersInfo}>Заголовок: {banner.title}</p>
                                    <p className={styles.adminBannersInfo}>Кнопка: {banner.btn_name}</p>
                                    <p className={styles.adminBannersInfo}>Ссылка: <a href={banner.link}>Ссылка</a></p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>

                    <div className={`${styles.adminBannersButtons} ${locked ? styles.noSwiping : ""}`}>
                        <button className={styles.adminBannersPrev} onClick={() => (sliderRef.current as unknown as SwiperRef).swiper.slidePrev()}>
                            <Image src={SliderArrowIcon} alt={'Предыдущий'}/>
                        </button>
                        <button className={styles.adminBannersNext} onClick={() => (sliderRef.current as unknown as SwiperRef).swiper.slideNext()} >
                            <Image className={styles.adminBannersNextImage} src={SliderArrowIcon} alt={'Следующий'}/>
                        </button>
                    </div>

            </div>

        </>

    );
}
