import { Field } from './Field';
import { ofKebabOrCamelCaseToTitle } from './ofKebabOrCamelCaseToTitle';
import { fieldCataMorph } from './fieldCataMorph';
import { ColDef } from "./ColDef";

export function toAllColumns(fields: Field[]) {
    const ifPrimitive = (x: string) => [{ header: ofKebabOrCamelCaseToTitle(x), property: x }];
    const ifLocal = ([x]: [ColDef[]]) => [x[0]];
    const ifReference = ([collection, fieldName, props]: [string, string, ColDef[][]]) =>
        props
            .reduce((pv, cv) => [...pv, ...cv], [])
            .filter((x) => x.property !== '_id')
            .map((y) => ({
                header: ofKebabOrCamelCaseToTitle(collection),
                property: [fieldName, y.property].join('.')
            }));
    const ifNestedObj = ([objName, props]: [string, ColDef[][]]): ColDef[] =>
        props.reduce((pv, cv) => [...pv, ...cv], []).map((y) => ({ ...y, property: [objName, y.property].join('.') }));
    const recurse = fieldCataMorph<ColDef[]>(ifPrimitive, ifNestedObj, ifLocal, ifReference);
    return fields.map(recurse).reduce((pv, cv) => [...pv, ...cv], []);
}
