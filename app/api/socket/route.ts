import {Server, Socket} from 'socket.io';

export const dynamic = 'force-dynamic';

type AviMode =
    | 'idle'
    | 'floating'
    | 'wandering'
    | 'observing'
    | 'following'
    | 'sleeping'
    | 'reacting';

type AviEmotion =
    | 'calm'
    | 'curious'
    | 'happy'
    | 'shy'
    | 'sleepy'
    | 'surprised';

type AviTarget = {
    id: string;
    type: string;
    label: string;
    position: {
        x: number;
        y: number;
    };
};

type SharedAviState = {
    id: 'avi';
    route: string;
    position: {
        x: number;
        y: number;
    };
    target: AviTarget | null;
    mode: AviMode;
    emotion: AviEmotion;
    presence: 'present' | 'entering' | 'leaving' | 'away';
    direction: 'left' | 'right';
    thought: string | null;
    note: string | null;
    version: number;
    updatedAt: number;
};

type SharedWorldEntity = {
    id: string;
    type: string;
    label: string;
    position: {
        x: number;
        y: number;
    };
    score: number;
};

type SharedWorldSnapshot = {
    route: string;
    entities: SharedWorldEntity[];
    updatedAt: number;
};

type AviGlobal = typeof globalThis & {
    __webcosAviIo?: Server;
    __webcosAviState?: SharedAviState;
    __webcosAviWorlds?: Map<string, SharedWorldSnapshot>;
    __webcosAviInterval?: NodeJS.Timeout;
};

const globalForAvi = globalThis as AviGlobal;

const defaultState: SharedAviState = {
    id: 'avi',
    route: '/',
    position:{
        x:300,
        y:600
    },
    target: null,
    mode: 'floating',
    emotion: 'calm',
    presence: 'present',
    direction: 'right',
    thought: 'listening to the site',
    note: null,
    version: 1,
    updatedAt: Date.now(),
};

const routeThoughts: Record<string, string[]> = {
    '/': [
        'the home page feels like a small orbit',
        'I can hear the first section breathing',
    ],
    '/blog': [
        'there are many thoughts stored here',
        'I am reading between the headings',
    ],
    '/projects': [
        'these projects have tiny engines inside',
        'I want to compare these shapes',
    ],
};

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

function pick<T>(items: T[]) {
    return items[Math.floor(Math.random() * items.length)];
}

function getThought(route: string) {
    const options = routeThoughts[route] || [
        'this page has a quiet signal',
        'I am looking for the warmest edge',
        'someone just opened a little window here',
    ];

    return pick(options);
}

function getEmotion(target: AviTarget | null): AviEmotion {
    if (!target) {
        return Math.random() > 0.84 ? 'sleepy' : 'calm';
    }

    if (target.type === 'button' || target.type === 'form' || target.type === 'link') {
        return 'curious';
    }

    if (target.type === 'card' || target.type === 'media') {
        return Math.random() > 0.5 ? 'happy' : 'curious';
    }

    return 'calm';
}

function getMode(target: AviTarget | null): AviMode {
    if (!target) {
        return 'wandering';
    }

    if (target.type === 'button' || target.type === 'link' || target.type === 'form') {
        return 'following';
    }

    if (target.type === 'article' || target.type === 'heading' || target.type === 'card') {
        return 'observing';
    }

    return 'wandering';
}

function getKnownRoutes(io: Server) {
    const routes = new Set<string>();

    for (const socket of io.sockets.sockets.values()) {
        const route = socket.data.route;

        if (typeof route === 'string' && route) {
            routes.add(route);
        }
    }

    return Array.from(routes);
}

function chooseRoute(io: Server, currentRoute: string) {
    const activeRoutes = getKnownRoutes(io);

    if (activeRoutes.includes(currentRoute) && Math.random() > 0.18) {
        return currentRoute;
    }

    if (activeRoutes.length) {
        return pick(activeRoutes);
    }

    return currentRoute || '/';
}

function chooseTarget(route: string) {
    const worlds = globalForAvi.__webcosAviWorlds;
    const world = worlds?.get(route);
    const entities = world?.entities
        ?.filter((entity) => entity.position.x > 0 && entity.position.y > 0)
        ?.sort((a, b) => b.score - a.score)
        ?.slice(0, 12);

    if (entities?.length) {
        const weighted = entities.flatMap((entity, index) => (
            Array.from({length: Math.max(1, 6 - Math.floor(index / 2))}, () => entity)
        ));
        const entity = pick(weighted);

        return {
            id: entity.id,
            type: entity.type,
            label: entity.label,
            position:{
                x:
                    entity.position.x+
                    (Math.random()*200-100),

                y:
                    entity.position.y+
                    (Math.random()*200-100)
            },
        };
    }

    return {
        id: 'open-space',
        type: 'page',
        label: 'open space',
        position: {
            x: 0.16 + Math.random() * 0.68,
            y: 0.18 + Math.random() * 0.58,
        },
    };
}

function stepAvi(io: Server) {
    const state = globalForAvi.__webcosAviState || defaultState;
    const route = chooseRoute(io, state.route);
    const switchingRoute = route !== state.route;
    const target = switchingRoute || !state.target || Math.random() > 0.72
        ? chooseTarget(route)
        : state.target;

    const dx = target.position.x - state.position.x;
    const dy = target.position.y - state.position.y;
    const distance = Math.hypot(dx, dy);
    const step=Math.min(
        30,
        Math.max(
            4,
            distance*0.05
        )
    );
    const nextPosition = distance < 0.035
        ? state.position
        : {
            x: clamp(state.position.x + (dx / distance) * step, 0.04, 0.96),
            y: clamp(
                state.position.y + (dy / distance) * step,
                0.02,
                0.98
            )
        };
    const emotion = getEmotion(target);

    globalForAvi.__webcosAviState = {
        ...state,
        route,
        position: switchingRoute
            ? {
                x: dx >= 0 ? 0.04 : 0.96,
                y: clamp(
                    target.position.y,
                    0.02,
                    0.98
                )
            }
            : nextPosition,
        target,
        mode: distance < 0.05 ? 'observing' : getMode(target),
        emotion,
        presence: switchingRoute ? 'entering' : 'present',
        direction: dx >= 0 ? 'right' : 'left',
        thought: getThought(route),
        note: distance < 0.05 ? `Avi paused near ${target.label}.` : null,
        version: state.version + 1,
        updatedAt: Date.now(),
    };

    io.emit('avi:state', globalForAvi.__webcosAviState);
}

function registerSocket(io: Server, socket: Socket) {
    socket.emit('avi:state', globalForAvi.__webcosAviState || defaultState);

    socket.on('avi:hello', (payload: {route?: string}) => {
        if (payload.route) {
            socket.data.route = payload.route;
        }

        socket.emit('avi:state', globalForAvi.__webcosAviState || defaultState);
    });

    socket.on('world:snapshot', (snapshot: {route?: string; entities?: SharedWorldEntity[]}) => {
        if (!snapshot.route || !Array.isArray(snapshot.entities)) {
            return;
        }

        socket.data.route = snapshot.route;
        globalForAvi.__webcosAviWorlds?.set(snapshot.route, {
            route: snapshot.route,
            entities: snapshot.entities.slice(0, 32),
            updatedAt: Date.now(),
        });
    });

    socket.on('client:event', () => {
        const state = globalForAvi.__webcosAviState || defaultState;

        globalForAvi.__webcosAviState = {
            ...state,
            mode: 'reacting',
            emotion: 'surprised',
            thought: 'something moved nearby',
            version: state.version + 1,
            updatedAt: Date.now(),
        };

        io.emit('avi:state', globalForAvi.__webcosAviState);
    });
}

function ensureServer() {
    if (globalForAvi.__webcosAviIo) {
        return globalForAvi.__webcosAviIo;
    }

    globalForAvi.__webcosAviWorlds = globalForAvi.__webcosAviWorlds || new Map<string, SharedWorldSnapshot>();
    globalForAvi.__webcosAviState = globalForAvi.__webcosAviState || defaultState;

    const io = new Server(3001, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => registerSocket(io, socket));

    globalForAvi.__webcosAviIo = io;
    globalForAvi.__webcosAviInterval = setInterval(() => stepAvi(io), 2600);

    return io;
}

export async function GET() {
    try {
        ensureServer();

        return Response.json({
            success: true,
            state: globalForAvi.__webcosAviState,
        });
    } catch (error) {
        return Response.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unable to start Avi socket server',
            },
            {
                status: 500,
            },
        );
    }
}
