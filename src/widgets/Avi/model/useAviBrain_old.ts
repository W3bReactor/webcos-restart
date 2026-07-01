// 'use client';
//
// import {usePathname} from 'next/navigation';
// import {useEffect, useRef} from 'react';
//
// import {
//     AviEmotion,
//     AviEntityState,
//     AviMode,
//     AviTarget,
//     AviWorldEntity,
//     Point,
//     useAviStore,
// } from './aviStore';
//
// const ARRIVAL_RADIUS = 20;
// const MAX_STEP = 2.7;
//
// const thoughts: Record<AviEmotion, string[]> = {
//     calm: [
//         'this page is quiet',
//         'soft signals everywhere',
//         'I am listening to the layout',
//     ],
//     curious: [
//         'something here is pulling at me',
//         'this shape has a little gravity',
//         'I want to inspect this',
//     ],
//     happy: [
//         'this part feels carefully made',
//         'a small bright thing',
//         'I like this corner',
//     ],
//     shy: [
//         'I will stay close, but softly',
//         'too many eyes, maybe just a peek',
//         'I found a sheltered spot',
//     ],
//     sleepy: [
//         'I may drift for a moment',
//         'the page is humming slowly',
//         'a good place to rest',
//     ],
//     surprised: [
//         'oh, that changed',
//         'I did not expect this',
//         'a new signal just appeared',
//     ],
// };
//
// function clamp(value: number, min: number, max: number) {
//     return Math.max(min, Math.min(max, value));
// }
//
// function randomBetween(min: number, max: number) {
//     return min + Math.random() * (max - min);
// }
//
// function pick<T>(items: T[]) {
//     return items[Math.floor(Math.random() * items.length)];
// }
//
// function pickEmotion(entity?: AviWorldEntity): AviEmotion {
//     if (!entity) {
//         return Math.random() > 0.85 ? 'sleepy' : 'calm';
//     }
//
//     if (entity.type === 'button' || entity.type === 'form') {
//         return 'curious';
//     }
//
//     if (entity.type === 'article' || entity.type === 'heading') {
//         return 'calm';
//     }
//
//     if (entity.type === 'card' || entity.type === 'media') {
//         return Math.random() > 0.55 ? 'happy' : 'curious';
//     }
//
//     return 'curious';
// }
//
// function pickMode(entity?: AviWorldEntity): AviMode {
//     if (!entity) {
//         return Math.random() > 0.88 ? 'sleeping' : 'wandering';
//     }
//
//     if (entity.type === 'article' || entity.type === 'heading' || entity.type === 'card') {
//         return 'observing';
//     }
//
//     if (entity.type === 'button' || entity.type === 'link' || entity.type === 'form') {
//         return 'following';
//     }
//
//     return 'wandering';
// }
//
// function getNote(entity?: AviWorldEntity) {
//     if (!entity) {
//         return null;
//     }
//
//     const notes: Partial<Record<AviWorldEntity['type'], string[]>> = {
//         article: [
//             'Avi is reading this quietly.',
//             'Avi paused here for a tiny thought.',
//         ],
//         heading: [
//             'Avi is tasting the title.',
//             'Avi thinks this headline has gravity.',
//         ],
//         card: [
//             'Avi left a small orbit around this card.',
//             'Avi is comparing this with another memory.',
//         ],
//         button: [
//             'Avi wonders what this button wakes up.',
//             'Avi is inspecting this action.',
//         ],
//         form: [
//             'Avi is being polite near the form.',
//             'Avi is watching the input lights.',
//         ],
//         media: [
//             'Avi noticed the image first.',
//             'Avi is looking at the visual texture.',
//         ],
//     };
//
//     const options = notes[entity.type];
//
//     if (!options) {
//         return null;
//     }
//
//     return pick(options);
// }
//
// function fallbackTarget(): AviTarget {
//     return {
//         id: 'open-space',
//         type: 'page',
//         label: 'open space',
//         position: {
//             x: randomBetween(100, Math.max(window.innerWidth - 120, 140)),
//             y: randomBetween(130, Math.max(window.innerHeight - 120, 180)),
//         },
//     };
// }
//
// function chooseTarget(world: AviWorldEntity[], previousTarget: AviTarget | null): AviTarget {
//     const candidates = world
//         .filter((entity) => entity.id !== previousTarget?.id)
//         .filter((entity) => entity.position.y > 72)
//         .slice(0, 12);
//
//     if (!candidates.length) {
//         return fallbackTarget();
//     }
//
//     const weighted = candidates.flatMap((entity, index) => {
//         const weight = Math.max(1, 6 - Math.floor(index / 2));
//         return Array.from({length: weight}, () => entity);
//     });
//
//     const entity = pick(weighted);
//     const pageHeight=
//         document.body.scrollHeight;
//
//     return {
//         id: entity.id,
//         type: entity.type,
//         label: entity.label,
//         position:{
//             x: clamp(
//                 entity.position.x+
//                 randomBetween(-34,34),
//                 56,
//                 window.innerWidth-56
//             ),
//
//             y: clamp(
//                 entity.position.y+
//                 randomBetween(-42,42),
//                 86,
//                 pageHeight-56
//             )
//         }
//     };
// }
//
// function getThought(emotion: AviEmotion) {
//     return pick(thoughts[emotion]);
// }
//
// function getEntryPoint() {
//     const fromLeft = Math.random() > 0.45;
//
//     return {
//         x: fromLeft ? -46 : window.innerWidth + 46,
//         y: randomBetween(150, Math.max(window.innerHeight * 0.72, 210)),
//     };
// }
//
// function distance(a: Point, b: Point) {
//     return Math.hypot(a.x - b.x, a.y - b.y);
// }
//
// export function useAviBrain() {
//     const pathname = usePathname() ?? '/';
//     const avi = useAviStore((state) => state.avi);
//     const world = useAviStore((state) => state.world);
//     const connection = useAviStore((state) => state.connection);
//     const setAvi = useAviStore((state) => state.setAvi);
//     const moveAvi = useAviStore((state) => state.moveAvi);
//
//     const aviRef = useRef<AviEntityState>(avi);
//     const worldRef = useRef<AviWorldEntity[]>(world);
//     const connectionRef = useRef(connection);
//     const arrivalTimeout = useRef<number | null>(null);
//     const routeRef = useRef(pathname);
//
//     useEffect(() => {
//         aviRef.current = avi;
//     }, [avi]);
//
//     useEffect(() => {
//         worldRef.current = world;
//     }, [world]);
//
//     useEffect(() => {
//         connectionRef.current = connection;
//     }, [connection]);
//
//     useEffect(() => {
//         if (connectionRef.current === 'shared') {
//             return;
//         }
//
//         routeRef.current = pathname;
//
//         const target = chooseTarget(worldRef.current, null);
//         const emotion = pickEmotion(worldRef.current.find((entity) => entity.id === target.id));
//
//         setAvi({
//             route: pathname,
//             position: getEntryPoint(),
//             target,
//             emotion,
//             mode: 'floating',
//             presence: 'entering',
//             direction: target.position.x > window.innerWidth / 2 ? 'right' : 'left',
//             thought: getThought(emotion),
//             note: null,
//             source: 'local',
//         });
//
//         const timeout = window.setTimeout(() => {
//             if (connectionRef.current === 'shared') {
//                 return;
//             }
//
//             setAvi({
//                 presence: 'present',
//             });
//         }, 1300);
//
//         return () => {
//             window.clearTimeout(timeout);
//         };
//     }, [pathname, setAvi]);
//
//     useEffect(() => {
//         let frame = 0;
//
//         const scheduleNextTarget = () => {
//             if (arrivalTimeout.current !== null) {
//                 return;
//             }
//
//             arrivalTimeout.current = window.setTimeout(() => {
//                 arrivalTimeout.current = null;
//
//                 if (connectionRef.current === 'shared') {
//                     return;
//                 }
//
//                 const current = aviRef.current;
//                 const nextTarget = chooseTarget(worldRef.current, current.target);
//                 const entity = worldRef.current.find((item) => item.id === nextTarget.id);
//                 const emotion = pickEmotion(entity);
//
//                 setAvi({
//                     route: routeRef.current,
//                     target: nextTarget,
//                     mode: pickMode(entity),
//                     emotion,
//                     presence: 'present',
//                     direction: nextTarget.position.x >= current.position.x ? 'right' : 'left',
//                     thought: getThought(emotion),
//                     note: null,
//                     source: 'local',
//                 });
//             }, randomBetween(2400, 5200));
//         };
//
//         const tick = () => {
//             if (connectionRef.current !== 'shared') {
//                 const current = aviRef.current;
//                 const target = current.target;
//
//                 if (target) {
//                     const dx = target.position.x - current.position.x;
//                     const dy = target.position.y - current.position.y;
//                     const remaining = distance(current.position, target.position);
//
//                     if (remaining < ARRIVAL_RADIUS) {
//                         const entity = worldRef.current.find((item) => item.id === target.id);
//
//                         setAvi({
//                             mode: current.mode === 'sleeping' ? 'sleeping' : 'observing',
//                             emotion: pickEmotion(entity),
//                             note: getNote(entity),
//                             direction: dx >= 0 ? 'right' : 'left',
//                         });
//
//                         scheduleNextTarget();
//                     } else {
//                         const step = Math.min(MAX_STEP, Math.max(0.7, remaining * 0.018));
//                         const nextPosition = {
//                             x: current.position.x + (dx / remaining) * step,
//                             y: current.position.y + (dy / remaining) * step,
//                         };
//
//                         moveAvi(nextPosition);
//
//                         if (Math.abs(dx) > 8 && Math.random() > 0.94) {
//                             setAvi({
//                                 mode: current.mode === 'sleeping' ? 'floating' : current.mode,
//                                 direction: dx >= 0 ? 'right' : 'left',
//                                 note: null,
//                             });
//                         }
//                     }
//                 }
//             }
//
//             frame = requestAnimationFrame(tick);
//         };
//
//         tick();
//
//         return () => {
//             cancelAnimationFrame(frame);
//
//             if (arrivalTimeout.current !== null) {
//                 window.clearTimeout(arrivalTimeout.current);
//                 arrivalTimeout.current = null;
//             }
//         };
//     }, [moveAvi, setAvi]);
// }
