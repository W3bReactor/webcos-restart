// 'use client';
//
// import {usePathname} from 'next/navigation';
// import {useEffect, useRef} from 'react';
// import {io, Socket} from 'socket.io-client';
//
// import {AviEntityState, AviWorldEntity, useAviStore} from './aviStore';
//
// interface SharedAviState extends Omit<AviEntityState, 'position' | 'target' | 'source'> {
//     position: {
//         x: number;
//         y: number;
//     };
//     target: AviEntityState['target'] | null;
// }
//
// function getSocketUrl() {
//     if (process.env.NEXT_PUBLIC_AVI_SOCKET_URL) {
//         return process.env.NEXT_PUBLIC_AVI_SOCKET_URL;
//     }
//
//     return `${window.location.protocol}//${window.location.hostname}:3001`;
// }
//
// // function toPagePoint(
// //     point:{
// //         x:number,
// //         y:number
// //     }
// // ){
// //
// //     const world=document.body;
// //
// //     return{
// //
// //         x:
// //             point.x*
// //             world.scrollWidth,
// //
// //         y:
// //             point.y*
// //             world.scrollHeight
// //
// //     };
// //
// // }
// //
//
// function toViewportPoint(
//     point:{
//         x: number
//         y: number
//     }
// ){
//
//     return {
//
//         x:
//             point.x*
//             window.innerWidth,
//
//         y:
//             point.y*
//             window.innerHeight
//     };
//
// }
//
// function toSharedPoint(
//     point:{
//         x: number
//         y: number
//     }
// ){
//
//     return{
//
//         x:
//             point.x/
//             window.innerWidth,
//
//         y:
//             point.y/
//             window.innerHeight
//     };
//
// }
//
// function normalizeWorld(world: AviWorldEntity[]) {
//     return world.map((entity) => ({
//         ...entity,
//         position: toSharedPoint(entity.position),
//     }));
// }
//
// export function useAviSocket() {
//     const pathname = usePathname() ?? '/';
//     const world = useAviStore((state) => state.world);
//     const setAvi = useAviStore((state) => state.setAvi);
//     const setConnection = useAviStore((state) => state.setConnection);
//     const socketRef = useRef<Socket | null>(null);
//
//     useEffect(() => {
//         let closed = false;
//
//         const connect = async () => {
//             setConnection('connecting');
//
//             try {
//                 const response = await fetch('/api/socket', {
//                     cache: 'no-store',
//                 });
//
//                 if (!response.ok) {
//                     setConnection('local');
//                     return;
//                 }
//             } catch {
//                 setConnection('local');
//                 return;
//             }
//
//             if (closed) {
//                 return;
//             }
//
//             const socket = io(getSocketUrl(), {
//                 autoConnect: true,
//                 reconnectionAttempts: 2,
//                 timeout: 1600,
//                 transports: ['websocket', 'polling'],
//             });
//
//             socketRef.current = socket;
//
//             socket.on('connect', () => {
//                 setConnection('shared');
//                 socket.emit('avi:hello', {
//                     route: pathname,
//                     viewport: {
//                         width: window.innerWidth,
//                         height: window.innerHeight,
//                     },
//                 });
//             });
//
//             socket.on('connect_error', () => {
//                 setConnection('local');
//             });
//
//             socket.on('disconnect', () => {
//                 setConnection('local');
//             });
//
//             socket.on('avi:state', (state: SharedAviState) => {
//                 const target = state.target
//                     ? {
//                         ...state.target,
//                         position: toViewportPoint(state.target.position),
//                     }
//                     : null;
//
//                 setAvi({
//                     ...state,
//                     position: toViewportPoint(state.position),
//                     target,
//                     source: 'shared',
//                 });
//             });
//         };
//
//         connect();
//
//         return () => {
//             closed = true;
//             socketRef.current?.disconnect();
//             socketRef.current = null;
//         };
//     }, [pathname, setAvi, setConnection]);
//
//     useEffect(() => {
//         const socket = socketRef.current;
//
//         if (!socket?.connected) {
//             return;
//         }
//
//         socket.emit('world:snapshot', {
//             route: pathname,
//             viewport: {
//                 width: window.innerWidth,
//                 height: window.innerHeight,
//             },
//             entities: normalizeWorld(world),
//         });
//     }, [pathname, world]);
// }
