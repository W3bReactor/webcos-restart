// 'use client';
//
// import {useEffect} from 'react';
// import {useAviStore} from './aviStore';
//
// export function useAviDecision(){
//
//     const avi=
//         useAviStore(
//             s=>s.avi
//         );
//
//     const world=
//         useAviStore(
//             s=>s.world
//         );
//
//     const setAvi=
//         useAviStore(
//             s=>s.setAvi
//         );
//
//     useEffect(()=>{
//
//         const interval=
//             setInterval(()=>{
//
//                 const needs=
//                     avi.needs;
//
//                 if(
//                     needs.energy<15
//                 ){
//
//                     setAvi({
//
//                         mode:'sleeping',
//                         thought:'Хочу отдохнуть...',
//                         target:null
//
//                     });
//
//                     return;
//
//                 }
//
//                 if(
//                     avi.mode==='sleeping'
//                 ){
//
//                     if(
//                         needs.energy>60
//                     ){
//
//                         setAvi({
//
//                             mode:'idle',
//                             thought:'О, снова полно сил!'
//
//                         });
//
//                     }
//
//                     return;
//                 }
//
//
//                 if(
//                     needs.boredom>80
//                 ){
//
//                     setAvi({
//
//                         thought:
//                             'Скучновато тут...'
//
//                     });
//
//                 }
//
//                 if(
//                     avi.pauseUntil>
//                     Date.now()
//                 ){
//                     return;
//                 }
//
//
//                 if(
//                     world.length===0
//                 ){
//                     return;
//                 }
//
//                 const distance=
//                     avi.target
//                         ?
//                         Math.hypot(
//
//                             avi.target.position.x-
//                             avi.position.x,
//
//                             avi.target.position.y-
//                             avi.position.y
//
//                         )
//                         :
//                         Infinity;
//
//                 // дошёл до цели
//                 if(
//                     distance<
//                     60
//                 ){
//
//                     setAvi({
//
//                         target:null,
//
//                         pauseUntil:
//                             Date.now()+4000,
//
//                         mode:
//                             'idle'
//
//                     });
//
//                     return;
//                 }
//
//                 // если цели нет → выбрать новую
//                 if(
//                     !avi.target
//                 ){
//
//                     const candidates=
//                         world.filter(
//                             x=>
//                                 !avi.memory.includes(
//                                     x.id
//                                 )
//                         );
//
//                     const target=
//                         (
//                             candidates.length
//                                 ?
//                                 candidates
//                                 :
//                                 world
//                         )[
//                             Math.floor(
//                                 Math.random()*
//                                 (
//                                     candidates.length||
//                                     world.length
//                                 )
//                             )
//                             ];
//
//                     // если всё уже просмотрено
//                     if(
//                         candidates.length===0
//                     ){
//
//                         setAvi({
//
//                             thought:
//                                 'Хмм... я тут уже всё видел',
//
//                             memory:[],
//
//                             mode:
//                                 'wandering'
//
//                         });
//
//                         return;
//
//                     }
//
//                     setAvi({
//
//                         target,
//
//                         mode:
//                             'wandering',
//
//                         thought:
//                             `Хм... ${target.label}`
//
//                     });
//
//                 }
//
//             },3000);
//
//         return()=>{
//
//             clearInterval(
//                 interval
//             );
//
//         };
//
//     },[
//         avi,
//         world
//     ]);
//
// }