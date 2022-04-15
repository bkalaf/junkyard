export function distinct<T>(arr: T[], accum: T[] = []): T[] {
    if (arr.length === 0) { return accum; }
    const [head, ...tail] = arr;
    if (accum.includes(head)) { return distinct(tail, accum); }
    return distinct(tail, [...accum, head]);
}
