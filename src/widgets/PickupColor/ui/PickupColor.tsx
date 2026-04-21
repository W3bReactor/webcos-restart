import styles from './PickupColor.module.css'
import React from "react";
import {PickupColorWindow} from "@/widgets/PickupColor/ui/PickupColorWindow/PickupColorWindow";


export const PickupColor = () => {
    return (
        <section className={styles.projectSection}>
            <h1 className={styles.projectTitle}>Подбор цвета из изображения</h1>
            <PickupColorWindow/>
        </section>
    );
}
