'use client';

import {useEffect} from 'react';
import {useAviStore} from './aviStore';

const SPEED = 2;
const STOP_DISTANCE = 40;

export function useAviMovement(){

    const avi=
        useAviStore(
            s=>s.avi
        );

    const moveAvi=
        useAviStore(
            s=>s.moveAvi
        );

    const setAvi=
        useAviStore(
            s=>s.setAvi
        );

    useEffect(()=>{

        let animationId:number;

        const move=()=>{

            const target=
                avi.target;

            if(!target){

                animationId=
                    requestAnimationFrame(
                        move
                    );

                return;
            }

            const dx=
                target.position.x-
                avi.position.x;

            const dy=
                target.position.y-
                avi.position.y;

            const distance=
                Math.sqrt(
                    dx*dx+
                    dy*dy
                );

            if(
                distance<
                STOP_DISTANCE
            ){

                setAvi({

                    mode:'idle'

                });

                return;
            }

            const angle=
                Math.atan2(
                    dy,
                    dx
                );

            const newX=
                avi.position.x+
                Math.cos(angle)*
                SPEED;

            const newY=
                avi.position.y+
                Math.sin(angle)*
                SPEED;

            moveAvi({

                x:newX,
                y:newY
            });

            setAvi({

                direction:
                    dx>0
                        ?'right'
                        :'left',

                mode:
                    'wandering'
            });

            animationId=
                requestAnimationFrame(
                    move
                );

        };

        animationId=
            requestAnimationFrame(
                move
            );

        return()=>{

            cancelAnimationFrame(
                animationId
            );

        };

    },[
        avi.target,
        avi.position
    ]);

}