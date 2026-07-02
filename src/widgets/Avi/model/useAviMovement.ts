'use client';

import {useEffect} from 'react';
import {useAviStore} from './aviStore';

const SPEED=2;

export function useAviMovement(){

    useEffect(()=>{

        let frame:number;

        const animate=()=>{

            const state=
                useAviStore.getState();

            const avi=
                state.avi;

            if(!avi.target){

                frame=
                    requestAnimationFrame(
                        animate
                    );

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

            if(
                distance<3
            ){

                frame=
                    requestAnimationFrame(
                        animate
                    );

                return;
            }

            state.moveAvi({

                x:

                    avi.position.x+
                    dx/distance*
                    SPEED,

                y:

                    avi.position.y+
                    dy/distance*
                    SPEED

            });

            frame=
                requestAnimationFrame(
                    animate
                );

        };

        animate();

        return()=>{

            cancelAnimationFrame(
                frame
            );

        };

    },[]);

}