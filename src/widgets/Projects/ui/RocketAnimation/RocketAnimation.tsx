import styles from './RocketAnimation.module.css'
import React from "react";


export const RocketAnimation = () => {
    return (
        <div className={styles.scene}>
            <div className={styles.windLeft}></div>
            <div className={styles.windRight}></div>
            <div className={styles.exhaust}></div>
            <div className={styles.capsule}>
                <div className={styles.top}>
                    <div className={styles.shadow}></div>
                </div>
                <div className={styles.base}></div>
            </div>
            <div className={styles.windowBig}></div>
            <div className={styles.windowSmall}></div>
            <div className={styles.fire1}></div>
            <div className={styles.fire2}></div>
            <div className={styles.fire3}></div>
            <div className={styles.fire4}></div>
            <div className={styles.spark1}></div>
            <div className={styles.spark2}></div>
            <div className={styles.spark3}></div>
            <div className={styles.spark4}></div>

        </div>
    );
}
