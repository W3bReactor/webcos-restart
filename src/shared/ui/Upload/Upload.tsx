'use client'
import styles from './Upload.module.css'
import React, {useRef} from "react";
import Image from "next/image";
import {UploadIcon} from "@/shared/assets";
interface IUpload {
    className?: string;
    url: string;
    setUrl: (arr: string) => void
    image: null | File;
    setImage: (arg: File | null) => void

}

export const Upload = ({url, setUrl, setImage}: IUpload) => {
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (inputFileRef.current?.files?.length === 0) {
            alert('Please, select file you want to upload');
            return;
        }

        if(inputFileRef.current && inputFileRef.current?.files) {
            const newImage: File = inputFileRef.current.files[0]
            setImage(newImage);
        }

        const reader  = new FileReader();

        if(inputFileRef.current?.files) {

            reader.onload = function(e)  {
                // the result image data
                if(e.target) {
                    const newUrl = (e.target.result as string)
                    setUrl(newUrl);
                }
            }
            reader.readAsDataURL(inputFileRef.current?.files[0]);
            console.log(inputFileRef.current?.files[0])
        }
    };
    const onDeleteImage = () => {
        setUrl('');
        setImage(null);
    }

    return (
        <>
            <div className={styles.upload}>
                {url ?
                    <>
                        <Image className={styles.uploadedImage} width={212} height={181} alt={'Аватар'} src={url}/>
                        <input ref={inputFileRef} onChange={(e) => onImageChange(e)} className={styles.uploadInput} type="file"/>
                        <button onClick={() => onDeleteImage()} className={styles.uploadedDelete}></button>
                    </>
                    :
                    <>
                        <Image src={UploadIcon} alt={'Загрузить'}/>
                        <h3 className={styles.uploadTitle}>Загрузить</h3>
                        <input ref={inputFileRef} onChange={(e) => onImageChange(e)} className={styles.uploadInput} type="file"/>
                    </>
                }
            </div>

        </>

    );
}
