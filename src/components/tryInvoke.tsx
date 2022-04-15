export function tryInvoke<T, U>(func?: (x: T) => U, result?: U) {
    return function (item: T) {
        return func == null ? result : func(item);
    };
}
