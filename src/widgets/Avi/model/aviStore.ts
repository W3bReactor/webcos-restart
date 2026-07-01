'use client';

import {create} from 'zustand';
import {persist} from 'zustand/middleware';


interface AviNeeds{

    curiosity:number;
    boredom:number;
    social:number;
    energy:number;

}

export type AviMode =
    | 'idle'
    | 'floating'
    | 'wandering'
    | 'observing'
    | 'following'
    | 'sleeping'
    | 'reacting';

export type AviEmotion =
    | 'calm'
    | 'curious'
    | 'happy'
    | 'shy'
    | 'sleepy'
    | 'surprised';

export type AviPresence =
    | 'present'
    | 'entering'
    | 'leaving'
    | 'away';

export type AviDirection =
    | 'left'
    | 'right';

export interface Point {
    x: number;
    y: number;
}

export interface AviTarget {
    id: string;
    type: AviWorldEntityType | 'page' | 'user';
    label: string;
    position: Point;
}

export interface AviEntityState {
    id: 'avi';
    route: string;
    position: Point; // где находится Ави
    target: AviTarget | null; // куда хочет идти
    mode: AviMode; // что делает
    emotion: AviEmotion;
    presence: AviPresence;
    direction: AviDirection;
    thought: string | null;
    note: string | null;
    version: number;
    updatedAt: number;
    source: 'local' | 'shared';
    needs: AviNeeds; // потребности
    memory:string[];

    pauseUntil:number; // слежка
}

export type AviWorldEntityType =
    | 'navigation'
    | 'section'
    | 'article'
    | 'card'
    | 'button'
    | 'link'
    | 'form'
    | 'media'
    | 'heading';

export interface AviWorldEntity {
    id: string;
    type: AviWorldEntityType;
    label: string;
    text: string;
    position: Point;
    rect: {
        width: number;
        height: number;
    };
    href?:string;
    score: number;
}

interface AviStore {
    avi: AviEntityState;
    world: AviWorldEntity[];
    connection: 'local' | 'connecting' | 'shared';
    setAvi: (avi: Partial<AviEntityState>) => void;
    moveAvi: (position: Point) => void;
    setWorld: (world: AviWorldEntity[]) => void;
    setConnection: (connection: AviStore['connection']) => void;
}

const initialAvi: AviEntityState = {
    id: 'avi',
    route: '/',
    position: {
        x: 120,
        y: 220,
    },
    target: null,
    mode: 'floating',
    emotion: 'calm',
    presence: 'present',
    direction: 'right',
    thought: 'Изучаю страницу',
    note: null,
    version: 1,
    updatedAt: Date.now(),
    source: 'local',
    needs:{

        curiosity:30,
        boredom:10,
        social:20,
        energy:50

    },
    memory:[],
    pauseUntil:0,

};

export const useAviStore=
    create<AviStore>()(

        persist(

            (set)=>({

                avi:initialAvi,
                world:[],
                connection:'local',

                setAvi:(avi)=>
                    set((state)=>({

                        avi:{
                            ...state.avi,
                            ...avi,
                            version:
                                avi.version ??
                                state.avi.version+1,

                            updatedAt:
                                Date.now()
                        }

                    })),

                moveAvi:(position)=>
                    set((state)=>({

                        avi:{
                            ...state.avi,
                            position,
                            updatedAt:
                                Date.now()
                        }

                    })),

                setWorld:(world)=>
                    set({world}),

                setConnection:(connection)=>
                    set({connection})

            }),

            {

                name:'avi-store'

            })

    );