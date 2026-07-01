// 'use client';
//
// import {useEffect} from 'react';
// import {useAviStore} from './aviStore';
//
// export function useAviInteraction(){
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
//         if(
//             !avi.target
//         ){
//             return;
//         }
//
//         const distance=
//             Math.hypot(
//
//                 avi.target.position.x-
//                 avi.position.x,
//
//                 avi.target.position.y-
//                 avi.position.y
//
//             );
//
//         if(
//             distance<
//             50
//         ){
//
//             setAvi({
//
//                 mode:
//                     'observing',
//
//                 thought:
//                     `Изучаю ${avi.target.label}`
//
//             });
//
//         }
//
//     },[
//         avi.position,
//         avi.target
//     ]);
//
// }