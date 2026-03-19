import styles from './BlogItem.module.css'
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {CardDesc, CardTitle} from "@/shared/ui";

interface IBlogItem {
    title: string
    description: string
    className?: string
    image?: string;
    id: string
    imageHeight?: number
}

export const BlogItem = ({description, title, className, image, id, imageHeight}: IBlogItem) => {
    return (
        <li className={`${styles.blogItem} ${className ? className : ''}`}>

            <Link href={`/blog/${id}`} className={styles.blogItemLink}>
                {image &&
                    <Image className={styles.blogItemImage} src={image} alt={title} width={150} height={imageHeight ? imageHeight : 244 }/>
                }
                <div className={styles.blogItemContent}>
                    <CardTitle className={styles.blogTitle}>{title}</CardTitle>
                    <CardDesc className={styles.blogDesc}>{description}</CardDesc>
                </div>
            </Link>
        </li>
    );
}
