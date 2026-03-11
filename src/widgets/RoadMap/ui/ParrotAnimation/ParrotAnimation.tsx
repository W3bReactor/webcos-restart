import styles from './ParrotAnimation.module.css'
import React from "react";


export const ParrotAnimation = () => {
    return (
        <div className={styles.parrot}>
            <div className={styles.parrotBody}>
                <div className={styles.parrotHead}>
                    <div className={`${styles.eye} ${styles.eyeLeft}`}></div>
                    <div className={`${styles.eye} ${styles.eyeRight}`}></div>
                </div>
                <div className={styles.parrotNose}>
                    <div className={`${styles.nostril} ${styles.nostrilLeft}`}></div>
                    <div className={`${styles.nostril} ${styles.nostrilRight}`}></div>
                </div>
                <div className={styles.parrotTail}></div>
                <div className={styles.parrotLump}>
                    <div className={styles.parrotLumpContainer}>
                        <div className={styles.parrotLumpItem}></div>
                    </div>
                    <div className={styles.parrotLumpContainer}>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                    </div>
                    <div className={styles.parrotLumpContainer}>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                    </div>
                    <div className={styles.parrotLumpContainer}>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                    </div>
                    <div className={styles.parrotLumpContainer}>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                    </div>
                    <div className={styles.parrotLumpContainer}>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                    </div>
                    <div className={styles.parrotLumpContainer}>
                        <div className={styles.parrotLumpItem}></div>
                        <div className={styles.parrotLumpItem}></div>
                    </div>
                    <div className={styles.parrotLumpContainer}>
                        <div className={styles.parrotLumpItem}></div>
                    </div>

                </div>
            </div>
        </div>
    );
}
