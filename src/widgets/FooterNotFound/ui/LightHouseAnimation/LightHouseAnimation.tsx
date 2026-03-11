import styles from './LightHouseAnimation.module.css'
import React from "react";


export const LightHouseAnimation = () => {
    return (
        <div className={styles.scene} >
            <div className={styles.background}>
                <div className={styles.mountains}>
                    <div className={styles.mountain}></div>
                    <div className={styles.mountain}></div>
                    <div className={styles.mountain}></div>
                    <div className={styles.mountain}></div>
                </div>
                <div className={styles.sea}>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.wave}></div>
                    <div className={styles.boat}>
                        <div className={styles.sail}></div>
                        <div className={styles.sail}></div>
                        <div className={styles.base}></div>
                    </div>
                </div>
            </div>
            <div className={styles.lighthouseGroup}>
                <div className={styles.land}></div>
                <div className={styles.lighthouseHolder}>
                    <div className={styles.shadow}></div>
                    <div className={styles.lighthouse}></div>
                    <div className={styles.top}>
                        <div className={styles.lightContainer}>
                            <div className={styles.light}></div>
                        </div>
                        <div className={styles.rail}></div>
                        <div className={styles.middle}></div>
                        <div className={styles.roof}>
                            <div className={styles.roofLight}></div>
                        </div>
                        <div className={styles.glow}></div>
                    </div>
                    <div className={styles.windows}>
                        <div className={styles.window}></div>
                        <div className={styles.window}></div>
                        <div className={styles.window}></div>
                        <div className={styles.window}></div>
                    </div>
                    <div className={styles.door}>
                        <div className={styles.stairs}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
