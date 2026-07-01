// 'use client';
//
// import {useEffect} from 'react';
// import {useAviStore} from './aviStore';
//
// export function useAviBrain(){
//
//     const world=
//         useAviStore(
//             s=>s.world
//         );
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
//             avi.target||
//             !world.length
//         ){
//
//             return;
//
//         }
//
//         const randomTarget=
//             world[
//                 Math.floor(
//                     Math.random()*
//                     world.length
//                 )
//                 ];
//
//         setAvi({
//
//             target:
//             randomTarget,
//
//             thought:
//                 `хм... ${randomTarget.label}`,
//
//             mode:
//                 'wandering'
//         });
//
//     },[
//         world,
//         avi.target,
//         setAvi
//     ]);
//
// }