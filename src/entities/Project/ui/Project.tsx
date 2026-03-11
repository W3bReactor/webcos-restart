import styles from './Project.module.css'
import React from "react";
import Link from "next/link";
import Image, {StaticImageData} from "next/image";
import {CardDesc, CardTitle} from "@/shared/ui";

interface IProduct {
    className?: string
    id: string
    title: string
    description: string
    image?: string
    imageAnimation: string
    link: string
}

export const Project = ({className, title, description, image, imageAnimation, id, link}:IProduct) => {
    return (
        <li className={`${styles.productItem} ${className ? className : ''}`}>
            <a className={styles.productLink} href={link}>
                <div className={styles.productContent}>
                    <CardTitle>{title}</CardTitle>
                    <CardDesc>{description}</CardDesc>
                </div>
                {image &&
                    <Image alt={title} className={`${styles.productImage}`} width={"200"} height={"150"} src={image}/>
                }
            </a>
        </li>
    );
}
