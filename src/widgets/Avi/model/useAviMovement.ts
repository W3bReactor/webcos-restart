'use client';

import {useEffect} from 'react';
import {useAviStore} from './aviStore';

const SPEED = 5;

export function useAviMovement() {

    useEffect(()=>{

        let frame:number;

        const move=()=>{

            const state=
                useAviStore.getState();

            const avi=
                state.avi;

            if(!avi.target){

                frame=requestAnimationFrame(move);
                return;
            }

            const dx=
                avi.target.position.x-
                avi.position.x;

            const dy=
                avi.target.position.y-
                avi.position.y;

            const distance=
                Math.hypot(
                    dx,
                    dy
                );

            if(distance<10){

                state.setAvi({

                    target:null,
                    thought:'Хм...'

                });

                frame=requestAnimationFrame(move);

                return;
            }

            const angle=
                Math.atan2(
                    dy,
                    dx
                );

            state.moveAvi({

                x:
                    avi.position.x+
                    Math.cos(angle)*
                    SPEED,

                y:
                    avi.position.y+
                    Math.sin(angle)*
                    SPEED

            });

            frame=
                requestAnimationFrame(
                    move
                );

        };

        move();

        return()=>{

            cancelAnimationFrame(
                frame
            );

        };

    },[]);

}