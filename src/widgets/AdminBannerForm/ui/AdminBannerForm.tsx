'use client'
import React, {useEffect, useState} from "react";
import styles from './AdminBannerForm.module.css'
import { Input, PurpleBtn, Upload} from "@/shared/ui";
import useSWRMutation from "swr/mutation";
import {ApiResult} from "@/shared/model";
import {createBannerApi, updateBannerApi, uploadImageBannerApi} from "@/shared/api/banners/bannersApi";
import {BannerCreate, BannerUpdate, BannerUploadImage} from "@/shared/api/banners/types";
import {IBanner} from "@/widgets/Slider";
import {redirect} from "next/navigation";


interface IAdminBannerForm {
    type: 'articles' | 'projects';
    formType: 'create' |'edit';
    bannerId?: number;
    supTitle?: string;
    title?: string
    button?: string
    link?: string
    image?: string;
}

export const AdminBannerForm = ({type, formType, bannerId, link, button, supTitle, title, image}: IAdminBannerForm) => {


    const [data, setData] = useState({
        bannerId: bannerId || -1,
        supTitle: supTitle || '',
        title: title || '',
        button: button || '',
        link: link || ''
    })


    const [error] = useState('')

    const [bannerImage, setBannerImage] = useState<File | null>(null)
    const [bannerUrl, setBannerUrl] = useState('')
    console.log(image)
    const { data: responseCreateBanner, trigger: createBanner } = useSWRMutation<
        ApiResult<IBanner>,
        Error,
        "banners/create",
        BannerCreate
    >(
        "banners/create",
        (_, { arg }) => createBannerApi(arg)
    )

    const { data: responseUpdateBanner, trigger: updateBanner } = useSWRMutation<
        ApiResult<IBanner>,
        Error,
        "banners/update",
        BannerUpdate
    >(
        "banners/update",
        (_, { arg }) => updateBannerApi(arg)
    )

    const { data: responseUpload, trigger: uploadBanner } = useSWRMutation<
        ApiResult<string>,
        Error,
        "banners/upload/image",
        BannerUploadImage
    >(
        "banners/upload/image",
        (_, { arg }) => uploadImageBannerApi(arg)
    )



    const onSend = async () => {
        if(formType == 'create') {
            await createBanner(
                {
                    type: type == 'articles' ? "ARTICLE" : "PROJECT",
                    title: data.title,
                    link: data.link,
                    btn_name: data.button,
                    suptitle: data.supTitle
                }
            )
        } else {
            await updateBanner(
                {
                    id: data.bannerId,
                    type: type == 'articles' ? "ARTICLE" : "PROJECT",
                    title: data.title,
                    link: data.link,
                    btn_name: data.button,
                    suptitle: data.supTitle
                }
            )

        }


    }


    useEffect(() => {
        if(responseUpdateBanner?.success && responseUpdateBanner.data.id && bannerImage != null) {
            const FD = new FormData();
            FD.append('file', bannerImage);
            uploadBanner({bannerId: responseUpdateBanner.data.id, body: FD})
        }
        if(responseCreateBanner?.success && responseCreateBanner.data.id && bannerImage != null) {
            const FD = new FormData();
            FD.append('file', bannerImage);
            uploadBanner({bannerId: responseCreateBanner.data.id, body: FD})
        }

        if(responseCreateBanner?.success || responseUpdateBanner?.success) {
            if(type == 'articles') {
                redirect(`/blog/`)
            } else {
                redirect(`/projects/`)
            }
        }
    }, [responseCreateBanner, responseUpdateBanner]);


    useEffect(() => {
        if(image) {
            setBannerUrl(image)
        }
    }, []);

    return (
        <div className={styles.adminCreateForm}>
            {error &&
                <h2 className={styles.adminError}>{error}</h2>
            }
            <Upload url={bannerUrl} setUrl={setBannerUrl} image={bannerImage} setImage={setBannerImage}/>
            <Input className={styles.adminCreateInput} placeholder={'Надзаголовок баннера'} value={data.supTitle} setValue={(value) => setData({...data, supTitle: value})}/>
            <Input className={styles.adminCreateInput} placeholder={'Заголовок баннера'} value={data.title} setValue={(value) => setData({...data, title: value})}/>
            <Input className={styles.adminCreateInput} placeholder={'Текст кнопки'} value={data.button} setValue={(value) => setData({...data, button: value})}/>
            <Input className={styles.adminCreateInput} placeholder={'Ссылка'} value={data.link} setValue={(value) => setData({...data, link: value})}/>
            <PurpleBtn onClick={onSend} className={styles.adminCreateBtn} type={'btn'}>{formType === "create" ? "Создать" : "Изменить"}</PurpleBtn>
        </div>
    );
}
