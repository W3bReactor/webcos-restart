// 'use client';
//
// import {useEffect} from 'react';
// import {useAviStore} from './aviStore';
//
// export function useAviNeeds(){
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
//         const interval=
//             setInterval(()=>{
//
//                 setAvi({
//
//                     needs:{
//
//                         curiosity:
//                             Math.min(
//                                 avi.needs.curiosity+2,
//                                 100
//                             ),
//
//                         boredom:
//                             Math.min(
//                                 avi.needs.boredom+1,
//                                 100
//                             ),
//
//                         social:
//                             Math.min(
//                                 avi.needs.social+0.5,
//                                 100
//                             ),
//
//                         energy:
//                             avi.mode==='sleeping'
//                                 ? Math.min(
//                                     avi.needs.energy+3,
//                                     100
//                                 )
//                                 : Math.max(
//                                     avi.needs.energy-1,
//                                     0
//                                 )
//                     }
//
//                 });
//
//             },5000);
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
//         avi.needs
//     ]);
//
// }