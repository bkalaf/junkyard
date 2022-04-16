import { Field } from './Field';
import { FieldObj } from './FieldObj';

export function fieldCataMorph<T>(
    isPrimitive: (x: string) => T,
    isNestedObj: (x: [string, T[]]) => T,
    isLocal: (x: [T]) => T,
    isReference: (x: [string, string, T[]]) => T
) {
    return function (field: Field): T {
        const recurse = fieldCataMorph(isPrimitive, isNestedObj, isLocal, isReference);
        if (FieldObj.is.primitive(field)) return isPrimitive(field);
        if (FieldObj.is.nestedObj(field)) return isNestedObj([field[0], field[1].map(recurse)]);
        if (FieldObj.is.local(field)) return isLocal([recurse(field[0])]);
        return isReference([field[0], field[1], field[2].map(recurse)]);
    };
}
