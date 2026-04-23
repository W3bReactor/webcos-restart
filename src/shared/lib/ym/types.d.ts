export {};

type YmArgs =
    | [number, "init", object?]
    | [number, "reachGoal", string, object?]
    | [number, "hit", string, object?]
    | [number, string, ...unknown[]];

declare global {
    interface Window {
        ym?: (...args: YmArgs) => void;
    }
}