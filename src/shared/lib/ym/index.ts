export const isYmAvailable = () => {
    return typeof window !== "undefined" && !!window.ym;
};