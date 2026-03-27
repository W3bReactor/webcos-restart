const requests = new Map<string, { count: number; time: number }>();

const RATE_LIMIT = 2; // сколько запросов
const WINDOW_MS = 60 * 1000; // 1 минута

export const checkRateLimit = (ip: string) => {
    const now = Date.now();

    const record = requests.get(ip);

    if (!record) {
        requests.set(ip, { count: 1, time: now });
        return true;
    }

    // если окно прошло → сбрасываем
    if (now - record.time > WINDOW_MS) {
        requests.set(ip, { count: 1, time: now });
        return true;
    }

    // увеличиваем счётчик
    record.count++;

    if (record.count > RATE_LIMIT) {
        return false;
    }

    return true;
}


setInterval(() => {
    const now = Date.now();

    for (const [ip, record] of requests) {
        if (now - record.time > WINDOW_MS) {
            requests.delete(ip);
        }
    }
}, 60 * 1000);

