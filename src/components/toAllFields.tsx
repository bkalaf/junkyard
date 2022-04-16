import { Field } from './Field';
import { fieldCataMorph } from './fieldCataMorph';

export function toAllFields(fields: Field[]) {
    const ifPrimitive = (x: string) => `${x}\n`;
    const ifNested = ([obj, props]: [string, string[]]) => [`${obj} {\n`, ...props, `}\n`].join('');
    const ifReference = ([collection, fieldName, props]: [string, string, string[]]) =>
        [`${fieldName} {\n`, ...props, `}\n`].join('');
    const ifLocal = ([name]: [string]) => [name.split('\n')[0], ' @client', name.split('\n')[1], '\n'].join('');
    const recurse = fieldCataMorph(ifPrimitive, ifNested, ifLocal, ifReference);
    return fields.map(recurse).join('');
}
