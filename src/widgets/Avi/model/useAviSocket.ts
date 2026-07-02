'use client';

import {useEffect} from 'react';
import SockJS from 'sockjs-client';
import {Client} from '@stomp/stompjs';

import {useAviStore} from './aviStore';

export function useAviSocket() {

    const setAvi =
        useAviStore(
            s => s.setAvi
        );

    const setConnection =
        useAviStore(
            s => s.setConnection
        );

    useEffect(() => {

        setConnection(
            'connecting'
        );

        const client =
            new Client({

                webSocketFactory: () =>

                    new SockJS(
                        process.env
                            .NEXT_PUBLIC_HOST +
                        '/ws'
                    ),

                reconnectDelay:
                    5000,

                onConnect: () => {

                    setConnection(
                        'shared'
                    );

                    client.subscribe(
                        '/topic/avi',
                        (message) => {

                            const incoming =
                                JSON.parse(
                                    message.body
                                );

                            const current =
                                useAviStore
                                    .getState()
                                    .avi;

                            const targetChanged =

                                incoming.targetX !== current.target?.position.x ||
                                incoming.targetY !== current.target?.position.y;

                            useAviStore
                                .getState()
                                .setAvi({

                                    route:
                                    incoming.route,

                                    target:

                                        targetChanged

                                            ? {

                                                id: 'target',
                                                type: 'page',
                                                label: 'target',

                                                position: {

                                                    x:
                                                    incoming.targetX,

                                                    y:
                                                    incoming.targetY

                                                }

                                            }

                                            : current.target,

                                    mode:
                                        incoming.mode.toLowerCase(),

                                    emotion:
                                        incoming.emotion.toLowerCase(),

                                    thought:
                                    incoming.thought

                                });

                        }
                    );
                },

                onDisconnect: () => {

                    setConnection(
                        'local'
                    );

                }

            });

        client.activate();

        return () => {

            client.deactivate();

        };

    }, []);

}