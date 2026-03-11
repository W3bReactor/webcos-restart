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
        planetHeight: 28,
        marginRight: -13,
        planetSrc: PlanetIcon1.src,
        planetWidth: 28,
        speed: 50,
        width: 1200
    },
    {
        id: '2',
        direction: 'right',
        height: 1050,
        planetHeight: 52,
        marginRight: -25,
        planetSrc: PlanetIcon2.src,
        planetWidth: 52,
        speed: 60,
        width: 1050
    },
    {
        id: '3',
        direction: 'left',
        height: 940,
        planetHeight: 120,
        marginRight: -60,
        planetSrc: PlanetIcon3.src,
        planetWidth: 120,
        speed: 70,
        width: 940
    },
    {
        id: '4',
        direction: 'right',
        height: 810,
        planetHeight: 140,
        marginRight: -60,
        planetSrc: PlanetIcon4.src,
        planetWidth: 140,
        speed: 80,
        width: 810
    },

    {
        id: '5',
        direction: 'left',
        height: 640,
        planetHeight: 110,
        marginRight: -50,
        planetSrc: PlanetIcon5.src,
        planetWidth: 110,
        speed: 90,
        width: 640
    },

    {
        id: '6',
        direction: 'right',
        height: 500,
        planetHeight: 90,
        marginRight: -40,
        planetSrc: PlanetIcon6.src,
        planetWidth: 100,
        speed: 60,
        width: 500
    },

    {
        id: '7',
        direction: 'left',
        height: 360,
        planetHeight: 36,
        marginRight: -15,
        planetSrc: PlanetIcon7.src,
        planetWidth: 36,
        speed: 110,
        width: 360
    },
    {
        id: '8',
        direction: 'right',
        height: 260,
        planetHeight: 24,
        marginRight: -13,
        planetSrc: PlanetIcon8.src,
        planetWidth: 24,
        speed: 120,
        width: 260
    }
]

