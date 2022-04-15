export const isDotNotation = (s: string) => s.includes('.');
export function setProp(name: string, value: any) {
    return function (obj: Record<string, any>): any {
        if (name.length === 0) return value;
        if (isDotNotation(name)) {
            const [head, ...tail] = name.split('.');
            return { ...obj, [head]: setProp(tail.join('.'), value)(obj[head] ?? {}) };
        }
        return { ...obj, [name]: value };
    };
}

export function getProp(name: string) {
    return function (obj: Record<string, any> = {}): any {
        if (isDotNotation(name)) {
            const [head, ...tail] = name.split('.');
            return getProp(tail.join('.'))(obj[head]);
        }
        return obj[name];
    };
}
