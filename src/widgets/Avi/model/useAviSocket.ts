'use client';

import {useEffect} from 'react';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';
import {useAviStore} from './aviStore';

export function useAviSocket(){

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
                            .NEXT_PUBLIC_HOST+
                        '/ws'
                    ),

                reconnectDelay:5000,

                onConnect:()=>{

                    setConnection(
                        'shared'
                    );

                    client.subscribe(

                        '/topic/avi',

                        message=>{

                            const incoming=
                                JSON.parse(
                                    message.body
                                );

                            useAviStore
                                .getState()
                                .setAvi({

                                    route:
                                    incoming.route,

                                    mode:
                                        incoming.mode
                                            .toLowerCase(),

                                    emotion:
                                        incoming.emotion
                                            .toLowerCase(),

                                    thought:
                                    incoming.thought,

                                    position:{

                                        x:
                                            incoming.position?.x ?? 120,

                                        y:
                                            incoming.position?.y ?? 220
                                    }

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