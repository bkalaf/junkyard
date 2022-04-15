
export function partitionBy<T>(predicate: (x: T) => boolean) {
    return function (arr: T[]): [truthy: T[], falsey: T[]] {
        function inner(remain: T[], accumT: T[], accumF: T[]): [T[], T[]] {
            if (remain.length === 0) { return [accumT, accumF]; }
            const [head, ...tail] = remain;
            if (predicate(head)) { return inner(tail, [...accumT, head], accumF); }
            return inner(tail, accumT, [...accumF, head]);
        }
        return inner(arr, [], []);
    };
}
