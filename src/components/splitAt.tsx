export function splitAt<T>(predicate: (x: T) => boolean) {
    return function (arr: T[], accum: T[][] = [], current: T[] = []): T[][] {
        if (arr.length === 0)
            return [...accum, current];
        const [head, ...tail] = arr;
        if (predicate(head)) {
            return splitAt(predicate)(tail, [...accum, current], [head]);
        }
        return splitAt(predicate)(tail, accum, [...current, head]);
    };
}
