'use client';

import {useEffect} from 'react';
import {AviWorldEntityType,useAviStore} from './aviStore';

const reactions:Partial<
    Record<
        AviWorldEntityType,
        string[]
    >
>={

    article:[
        'Интересно...',
        'Хмм, почитаю',
        'Что тут написано?'
    ],

    link:[
        'Куда это ведёт?',
        'Любопытно...',
        'Хочу посмотреть'
    ],

    button:[
        'Нажать?',
        'Что делает эта штука?',
        'Хмм...'
    ],

    heading:[
        'Новая тема',
        'О, заголовок',
        'Любопытно'
    ],

    card:[
        'Что это?',
        'Выглядит интересно',
        'Хм...'
    ]

};

export function useAviPersonality(){

    const avi=
        useAviStore(
            s=>s.avi
        );

    const setAvi=
        useAviStore(
            s=>s.setAvi
        );

    useEffect(()=>{

        if(
            !avi.target
        ){
            return;
        }

        const distance=
            Math.hypot(

                avi.target.position.x-
                avi.position.x,

                avi.target.position.y-
                avi.position.y

            );

        if(
            distance>60
        ){
            return;
        }

        // не перебиваем важные мысли
        if(
            avi.mode==='observing'
        ){
            return;
        }

        if(
            avi.target.type==='page'||
            avi.target.type==='user'
        ){
            return;
        }

        const phrases=
            reactions[
                avi.target.type
                ];

        if(
            !phrases
        ){
            return;
        }

        // если мысль уже есть — не трогаем
        const lastThought=
            avi.thought||'';
        // TODO: Исправить множественный вызов
        if(
            lastThought.includes(
                'загляну'
            )
        ){
            return;
        }


        const thought=
            phrases[
                Math.floor(
                    Math.random()*
                    phrases.length
                )
                ];

        setAvi({

            thought

        });

    },[
        avi.position,
        avi.target
    ]);

}