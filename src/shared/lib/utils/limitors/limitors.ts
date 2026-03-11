export function debounce<Args extends unknown[]>(
    func: (this: unknown, ...args: Args) => void,
    wait = 300,
    immediate?: boolean
): (this: unknown, ...args: Args) => void {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return function (this: unknown, ...args: Args) {
        const later = () => {
            timeout = undefined;
            if (!immediate) func.apply(this, args);
        };

        const shouldCallNow = immediate && timeout === undefined;

        if (timeout !== undefined) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(later, wait);

        if (shouldCallNow) {
            func.apply(this, args);
        }
    };
}

export function throttle<Args extends unknown[]>(
    func: (this: unknown, ...args: Args) => void,
    limit = 300,
    options?: { leading?: boolean; trailing?: boolean }
): (this: unknown, ...args: Args) => void {
    let lastCall = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const { leading = true, trailing = true } = options || {};

    return function (this: unknown, ...args: Args) {
        const now = Date.now();

        const callFunction = () => {
            lastCall = now;
            func.apply(this, args);
        };

        if (leading && !timeout) {
            callFunction();
        }

        if (timeout) {
            clearTimeout(timeout);
            timeout = undefined;
        }

        if (!lastCall || now - lastCall >= limit) {
            if (leading) {
                callFunction();
            } else if (trailing) {
                timeout = setTimeout(callFunction, limit - (now - lastCall));
            }
        } else if (trailing) {
            timeout = setTimeout(callFunction, limit);
        }
    };
}
