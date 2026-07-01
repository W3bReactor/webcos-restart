'use client';

import {CSSProperties, useEffect} from 'react';
import {usePathname} from 'next/navigation';

import {useAviWorld} from '../model/useAviWorld';
import {useAviStore} from '../model/aviStore';
import styles from './Avi.module.css';
import {useAviMovement} from "@/widgets/Avi/model/useAviMovement";
import {useAviDecision} from "@/widgets/Avi/model/useAviDecision";
import {useAviMemory} from "@/widgets/Avi/model/useAviMemory";
import {useAviPersonality} from "@/widgets/Avi/model/useAviPersonality";
import {useAviNeeds} from "@/widgets/Avi/model/useAviNeeds";
import {useAviNavigation} from "@/widgets/Avi/model/useAviNavigation";

const particles = [
    {x: -28, y: -22, delay: 0.1, size: 4},
    {x: 30, y: -18, delay: 0.7, size: 3},
    {x: -36, y: 20, delay: 1.2, size: 3},
    {x: 34, y: 26, delay: 1.8, size: 5},
    {x: 4, y: -42, delay: 2.4, size: 3},
    {x: -8, y: 44, delay: 2.9, size: 4},
];

function getRouteLabel(route: string) {
    if (route === '/') {
        return 'home';
    }

    return route.replace(/^\//, '').replaceAll('/', ' / ');
}

export function Avi() {
    useAviWorld();
    useAviMovement();
    // useAviInteraction();
    useAviDecision();
    useAviPersonality();
    useAviMemory();
    useAviNeeds();
    useAviNavigation();
    // useAviAttention();
    // useAviBrain();
    // useAviSocket();
    // useAviBrain();
    // useAviNeeds();
    // useAviMemory();
    // useAviDecision();

    const pathname = usePathname() ?? '/';

    useEffect(()=>{

        useAviStore
            .getState()
            .setAvi({

                route:pathname,

                presence:'present'
            });

    },[]);

    const avi = useAviStore((state) => state.avi);

    useEffect(()=>{

        if(
            pathname===avi.route &&
            avi.presence==='leaving'
        ){

            useAviStore
                .getState()
                .setAvi({

                    presence:'entering',
                    thought:'О, я уже здесь'
                });

            setTimeout(()=>{

                useAviStore
                    .getState()
                    .setAvi({

                        presence:'present'
                    });

            },1500);

        }

    },[
        pathname,
        avi.route
    ]);
    const connection = useAviStore((state) => state.connection);


    if (pathname.startsWith('/admin')) {
        return null;
    }

    const isHere = avi.route === pathname && avi.presence !== 'away';
    const aviStyle: CSSProperties = {
        left: avi.position.x,
        top: avi.position.y,
    };

    if (!isHere) {
        return (
            <div className={styles.layer} aria-hidden="true">
                <div className={styles.trace}>
                    <span className={styles.traceDot}/>
                    Avi is visiting {getRouteLabel(avi.route)}
                </div>
            </div>
        );
    }

    return (
        <div className={styles.layer} aria-hidden="true">
            <div
                className={[
                    styles.avi,
                    styles[avi.emotion],
                    styles[avi.mode],
                    styles[avi.direction],
                ].join(' ')}
                style={aviStyle}
                data-presence={avi.presence}
            >
                <div className={styles.floatShell}>
                    <div className={styles.aura}/>
                    <div className={styles.body}>
                        <div className={styles.face}>
                            <span className={`${styles.eye} ${styles.eyeLeft}`}>
                                <span className={styles.pupil}/>
                            </span>
                            <span className={`${styles.eye} ${styles.eyeRight}`}>
                                <span className={styles.pupil}/>
                            </span>
                        </div>
                        <div className={styles.softEdge}/>
                        <div className={styles.tail}/>
                    </div>

                    {particles.map((particle) => (
                        <span
                            className={styles.particle}
                            key={`${particle.x}-${particle.y}`}
                            style={{
                                '--particle-x': `${particle.x}px`,
                                '--particle-y': `${particle.y}px`,
                                '--particle-delay': `${particle.delay}s`,
                                '--particle-size': `${particle.size}px`,
                            } as CSSProperties}
                        />
                    ))}

                    {avi.thought && (
                        <div className={styles.thought}>
                            {avi.thought}
                        </div>
                    )}

                    {avi.note && (
                        <div className={styles.note}>
                            {avi.note}
                        </div>
                    )}

                    {connection === 'shared' && (
                        <div className={styles.sharedPulse}/>
                    )}
                </div>
            </div>
        </div>
    );
}
