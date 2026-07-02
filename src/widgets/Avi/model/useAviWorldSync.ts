'use client';

import {useEffect} from 'react';
import {useAviStore} from './aviStore';

export function useAviWorldSync(){

    const world=
        useAviStore(
            s=>s.world
        );

    useEffect(()=>{

        if(
            !world.length
        ){
            return;
        }

        fetch(

            process.env
                .NEXT_PUBLIC_HOST+

            '/api/v1/avi/world',

            {

                method:'POST',

                headers:{

                    'Content-Type':
                        'application/json'

                },

                body:
                    JSON.stringify(

                        world.map(
                            e=>({

                                id:e.id,

                                type:e.type,

                                label:e.label,

                                text:e.text,

                                x:e.position.x,

                                y:e.position.y,

                                score:e.score

                            })
                        )

                    )

            }

        );

    },[
        world
    ]);

}