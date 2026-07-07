import {
    PlanetIcon1,
    PlanetIcon2,
    PlanetIcon3,
    PlanetIcon4,
    PlanetIcon5,
    PlanetIcon6,
    PlanetIcon7, PlanetIcon8
} from "@/widgets/Intro";

interface Planet {
    id: string;
    direction: 'left'| 'right';
    marginRight: number;
    planetSrc: string;
    planetHeight: number;
    planetWidth: number;
    height: number;
    width: number;
    speed: number
}


export const planets: Planet[] = [
    {
        id: '1',
        direction: 'left',
        height: 1200,
        width: 1200,
        planetHeight: 28,
        planetWidth: 28,
        marginRight: -13,
        planetSrc: PlanetIcon1.src,
        speed: 0.18,
    },
    {
        id: '2',
        direction: 'right',
        height: 1050,
        width: 1050,
        planetHeight: 52,
        planetWidth: 52,
        marginRight: -25,
        planetSrc: PlanetIcon2.src,
        speed: 0.14,
    },
    {
        id: '3',
        direction: 'left',
        height: 940,
        width: 940,
        planetHeight: 120,
        planetWidth: 120,
        marginRight: -60,
        planetSrc: PlanetIcon3.src,
        speed: 0.1,
    },
    {
        id: '4',
        direction: 'right',
        height: 810,
        width: 810,
        planetHeight: 140,
        planetWidth: 140,
        marginRight: -60,
        planetSrc: PlanetIcon4.src,
        speed: 0.08,
    },
    {
        id: '5',
        direction: 'left',
        height: 640,
        width: 640,
        planetHeight: 110,
        planetWidth: 110,
        marginRight: -50,
        planetSrc: PlanetIcon5.src,
        speed: 0.065,
    },
    {
        id: '6',
        direction: 'right',
        height: 500,
        width: 500,
        planetHeight: 90,
        planetWidth: 100,
        marginRight: -40,
        planetSrc: PlanetIcon6.src,
        speed: 0.05,
    },
    {
        id: '7',
        direction: 'left',
        height: 360,
        width: 360,
        planetHeight: 36,
        planetWidth: 36,
        marginRight: -15,
        planetSrc: PlanetIcon7.src,
        speed: 0.035,
    },
    {
        id: '8',
        direction: 'right',
        height: 260,
        width: 260,
        planetHeight: 24,
        planetWidth: 24,
        marginRight: -13,
        planetSrc: PlanetIcon8.src,
        speed: 0.025,
    },
];
