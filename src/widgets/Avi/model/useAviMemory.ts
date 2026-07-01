// 'use client';
//
// import {useEffect} from 'react';
// import {useAviStore} from './aviStore';
//
// export function useAviMemory(){
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
//             distance>60
//         ){
//             return;
//         }
//
//         if(
//             avi.memory.includes(
//                 avi.target.id
//             )
//         ){
//             return;
//         }
//
//         setAvi({
//
//             memory:[
//                 ...avi.memory,
//                 avi.target.id
//             ].slice(-20)
//
//         });
//
//     },[
//         avi.position,
//         avi.target
//     ]);
//
// }