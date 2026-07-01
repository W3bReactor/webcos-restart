'use client';

import {useEffect} from 'react';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';

import {useAviStore} from './aviStore';

export function useAviSocket(){

    const setAvi=
        useAviStore(
            s=>s.setAvi
        );

    const setConnection=
        useAviStore(
            s=>s.setConnection
        );

    useEffect(()=>{

        setConnection(
            'connecting'
        );

        const client=
            new Client({

                webSocketFactory:()=>

                    new SockJS(

                        process.env
                            .NEXT_PUBLIC_HOST +
                        '/ws'

                    ),

                reconnectDelay:
                    5000,

                onConnect:()=>{

                    setConnection(
                        'shared'
                    );

                    client.subscribe(
                        '/topic/avi',
                        (message)=>{

                            const avi=
                                JSON.parse(
                                    message.body
                                );

                            useAviStore
                                .getState()
                                .setAvi({

                                    route:avi.route,

                                    position:{
                                        x:avi.x,
                                        y:avi.y
                                    },

                                    target:
                                        avi.targetX!=null &&
                                        avi.targetY!=null
                                            ? {
                                                id:'target',
                                                type:'page',
                                                label:'target',
                                                position:{
                                                    x:avi.targetX,
                                                    y:avi.targetY
                                                }
                                            }
                                            : null,

                                    mode:
                                        avi.mode.toLowerCase(),

                                    emotion:
                                        avi.emotion.toLowerCase(),

                                    thought:
                                    avi.thought
                                });

                        }
                    );
                },

                onDisconnect:()=>{

                    setConnection(
                        'local'
                    );

                }

            });

        client.activate();

        return()=>{

            client.deactivate();

        };

    },[]);

}