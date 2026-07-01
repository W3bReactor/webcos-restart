// 'use client';
//
// import {useEffect} from 'react';
// import {useAviStore} from './aviStore';
//
// export function useAviNavigation(){
//
//     const avi=
//         useAviStore(
//             s=>s.avi
//         );
//
//     const setAvi=
//         useAviStore(
//             s=>s.setAvi
//         );
//
//     useEffect(()=>{
//
//         const target=
//             avi.target;
//
//         if(
//             !target
//         ){
//             return;
//         }
//
//         const distance=
//             Math.hypot(
//
//                 target.position.x-
//                 avi.position.x,
//
//                 target.position.y-
//                 avi.position.y
//             );
//
//         if(
//             distance>60
//         ){
//             return;
//         }
//
//         if(
//             target.type!=='link'
//         ){
//             return;
//         }
//
//         if(
//             !('href' in target)||
//             !target.href
//         ){
//             return;
//         }
//
//         setAvi({
//
//             thought:
//                 'Хмм... схожу посмотрю',
//
//             mode:
//                 'observing',
//
//             presence:
//                 'leaving'
//         });
//
//         const timeout=
//             setTimeout(()=>{
//
//                 setAvi({
//
//                     route:
//                     target.href,
//
//                     target:null,
//
//                     position:{
//                         x:120,
//                         y:220
//                     },
//
//                     presence:
//                         'entering',
//
//                     thought:
//                         'О, я уже здесь'
//                 });
//
//             },2000);
//
//         return()=>{
//
//             clearTimeout(
//                 timeout
//             );
//
//         };
//
//     },[
//         avi.target,
//         avi.position
//     ]);
//
// }