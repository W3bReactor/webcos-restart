'use client'
import styles from './PlanetSystem.module.css'

import Image from "next/image";
import dynamic from "next/dynamic";
import {planets, ThemeMoonImage, ThemeSunImage} from "@/widgets/Intro";
import {useEffect, useState} from "react";

const Planet = dynamic(() => import("@/widgets/Intro/ui/PlanetSystem/Planet/Planet"), { ssr: false });
export const PlanetSystem = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (window.innerWidth <= 564) {
            setIsMobile(true);
        }
    }, []);


    if(isMobile) {
        return;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.circleWrapper}>

                {planets.map(planet =>
                    <Planet
                        key={planet.id}
                        direction={planet.direction}
                        marginRight={planet.marginRight}
                        planet={planet.planetSrc}
                        planetHeight={planet.planetHeight}
                        planetWidth={planet.planetWidth}
                        height={planet.height}
                        width={planet.width}
                        speed={planet.speed}
                    />
                )}

                <Image alt={'Луна'} data-hide-on-theme="light" className={styles.themeImage} src={ThemeMoonImage}/>
                <Image alt={'Солнце'} data-hide-on-theme="dark" className={styles.themeImage} src={ThemeSunImage}/>
            </div>
        </div>
    );
}
