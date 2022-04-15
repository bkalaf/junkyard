export function createFrom<T>(func: () => T, len = 0): T[] {
    if (len === 0)
        return [];
    return [func(), ...createFrom(func, len - 1)];
}
