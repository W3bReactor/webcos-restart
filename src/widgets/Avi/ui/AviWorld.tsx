'use client';

import styles from './AviWorld.module.css';

export function AviWorld({
                             children
                         }:{
    children:React.ReactNode
}){

    return(

        <div
            id="avi-world"
            className={styles.world}
        >
            {children}
        </div>

    )

}