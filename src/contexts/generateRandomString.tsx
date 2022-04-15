import { createFrom } from "./createFrom";
import { rangeBetween } from "./rangeBetween";

export function generateRandomString(len: number) {
    const values = createFrom(() => Math.random(), len);
    const char1 = rangeBetween('0'.charCodeAt(0), '9'.charCodeAt(0));
    const char2 = rangeBetween('a'.charCodeAt(0), 'z'.charCodeAt(0));
    const char3 = rangeBetween('A'.charCodeAt(0), 'Z'.charCodeAt(0));
    const chars = [...char1, ...char2, ...char3];
    return values.map(x => chars[Math.floor(x * chars.length)]).map(x => String.fromCharCode(x)).join('');
}
