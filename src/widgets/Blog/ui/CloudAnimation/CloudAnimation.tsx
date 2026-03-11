import styles from './CloudAnimation.module.css';
import React from "react";
import {AirplaneIcon, CloudIcon, SpaceshipIcon1, SpaceshipIcon2, SpaceshipIcon3} from "@/widgets/Blog";

export const CloudAnimation = () => {
    return (
        <div className={styles.Clouds}>
            <div data-hide-on-theme='light' style={{backgroundImage: `url(${SpaceshipIcon1.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
            <div data-hide-on-theme='light' style={{backgroundImage: `url(${SpaceshipIcon2.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
            <div data-hide-on-theme='light' style={{backgroundImage: `url(${SpaceshipIcon3.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>

            <div data-hide-on-theme='dark' style={{backgroundImage: `url(${CloudIcon.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
            <div data-hide-on-theme='dark' style={{backgroundImage: `url(${AirplaneIcon.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
            <div data-hide-on-theme='dark' style={{backgroundImage: `url(${CloudIcon.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
            <div data-hide-on-theme='dark' style={{backgroundImage: `url(${CloudIcon.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
            <div data-hide-on-theme='dark' style={{backgroundImage: `url(${CloudIcon.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
            <div data-hide-on-theme='dark' style={{backgroundImage: `url(${CloudIcon.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
            <div data-hide-on-theme='dark' style={{backgroundImage: `url(${CloudIcon.src})`}} className={`${styles.Cloud} ${styles.Foreground}`}></div>
        </div>

    );
}
