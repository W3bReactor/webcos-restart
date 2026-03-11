interface Task {
    id: number
    title: string
    year: string
    desc: string
    position: number
}

export const initialTasks: Task[] = [
    {
        id: 1,
        title: "Начало разработки",
        year: '2019',
        desc: 'really',
        position: 1,
    },
    {
        id: 2,
        title: "Frontend",
        year: '2019',
        desc: 'good',
        position: 2,
    },
    {
        id: 3,
        title: "Backend",
        year: '2019',
        desc: 'Lorem',
        position: 3,
    },
];