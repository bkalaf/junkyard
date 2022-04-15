export function rangeBetween(start: number, end: number): number[] {
    if (start > end)
        return [];
    if (start === end)
        return [end];
    return [start, ...rangeBetween(start + 1, end)];
}
