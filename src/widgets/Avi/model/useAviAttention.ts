// // useAviAttention.ts
//
// 'use client';
//
// import {useEffect} from 'react';
// import {useAviStore} from './aviStore';
//
// let lastReaction=0;
//
// const COOLDOWN=5000;
//
// export function useAviAttention(){
//
//     const setAvi=
//         useAviStore(
//             s=>s.setAvi
//         );
//
//     useEffect(()=>{
//
//         const canReact=()=>{
//
//             return(
//                 Date.now()-
//                 lastReaction>
//                 COOLDOWN
//             );
//
//         };
//
//         const react=(thought:string)=>{
//
//             if(
//                 !canReact()
//             ){
//                 return;
//             }
//
//             lastReaction=
//                 Date.now();
//
//             setAvi({
//
//                 thought,
//
//                 mode:
//                     'reacting'
//
//             });
//
//         };
//
//         const handleMouseMove=()=>{
//
//             react(
//                 'Кто-то тут двигается...'
//             );
//
//         };
//
//         const handleClick=()=>{
//
//             react(
//                 'О, а что это?'
//             );
//
//         };
//
//         const handleScroll=()=>{
//
//             react(
//                 'Хмм... ниже что-то есть'
//             );
//
//         };
//
//         window.addEventListener(
//             'mousemove',
//             handleMouseMove
//         );
//
//         window.addEventListener(
//             'click',
//             handleClick
//         );
//
//         window.addEventListener(
//             'scroll',
//             handleScroll,
//             {
//                 passive:true
//             }
//         );
//
//         return()=>{
//
//             window.removeEventListener(
//                 'mousemove',
//                 handleMouseMove
//             );
//
//             window.removeEventListener(
//                 'click',
//                 handleClick
//             );
//
//             window.removeEventListener(
//                 'scroll',
//                 handleScroll
//             );
//
//         };
//
//     },[
//         setAvi
//     ]);
//
// }