import { fields, capitalize, ofKebabOrCamelCaseToTitle } from './TopBar';
import pluralize from './pluralize';
import { kebabToCamelCase } from './kebabToCamelCase';
import { useCollectionName } from './useCollectionName';
import { apollo } from '../config/apollo';
import * as CRUD from './../config/apollo.json';
import { makeVar } from '@apollo/client';

export type PrimitiveField = string;
export type NestedObjectField = [objectName: string, properties: Field[]];
export type LocalField = [fieldName: Field];
export type ReferenceField = [collection: string, fieldName: string, projection: Field[]];
export type Field = PrimitiveField | NestedObjectField | LocalField | ReferenceField;

export const Field = {
    is: {
        primitive: (x: Field): x is PrimitiveField => typeof x === 'string',
        nestedObj: (x: Field): x is NestedObjectField => Array.isArray(x) && x.length === 2,
        local: (x: Field): x is LocalField => Array.isArray(x) && x.length === 1,
        reference: (x: Field): x is ReferenceField => Array.isArray(x) && x.length === 3
    }
};

export function fieldCataMorph<T>(
    isPrimitive: (x: string) => T,
    isNestedObj: (x: [string, T[]]) => T,
    isLocal: (x: [T]) => T,
    isReference: (x: [string, string, T[]]) => T
) {
    return function (field: Field): T {
        const recurse = fieldCataMorph(isPrimitive, isNestedObj, isLocal, isReference);
        if (Field.is.primitive(field)) return isPrimitive(field);
        if (Field.is.nestedObj(field)) return isNestedObj([field[0], field[1].map(recurse)]);
        if (Field.is.local(field)) return isLocal([recurse(field[0])]);
        return isReference([field[0], field[1], field[2].map(recurse)]);
    };
}

export type ColDef = { header: string; property: string };
export function toAllColumns(fields: Field[]) {
    const ifPrimitive = (x: string) => [{ header: ofKebabOrCamelCaseToTitle(x), property: x }];
    const ifLocal = ([x]: [ColDef[]]) => [x[0]];
    const ifReference = ([collection, fieldName, props]: [string, string, ColDef[][]]) =>
        props
            .reduce((pv, cv) => [...pv, ...cv], [])
            .filter((x) => x.property !== '_id')
            .map((y) => ({ header: ofKebabOrCamelCaseToTitle(collection), property: [fieldName, y.property].join('.') }));
    const ifNestedObj = ([objName, props]: [string, ColDef[][]]): ColDef[] =>
        props.reduce((pv, cv) => [...pv, ...cv], []).map((y) => ({ ...y, property: [objName, y.property].join('.') }));
    const recurse = fieldCataMorph<ColDef[]>(ifPrimitive, ifNestedObj, ifLocal, ifReference);
    return fields.map(recurse).reduce((pv, cv) => [...pv, ...cv], []);
}

export function toAllFields(fields: Field[]) {
    const ifPrimitive = (x: string) => `${x}\n`;
    const ifNested = ([obj, props]: [string, string[]]) => [`${obj} {\n`, ...props, `}\n`].join('');
    const ifReference = ([collection, fieldName, props]: [string, string, string[]]) =>
        [`${fieldName} {\n`, ...props, `}\n`].join('');
    const ifLocal = ([name]: [string]) => [name.split('\n')[0], ' @client', name.split('\n')[1], '\n'].join('');
    const recurse = fieldCataMorph(ifPrimitive, ifNested, ifLocal, ifReference);
    return fields.map(recurse).join('');
}
export type QueryLiteral = {
    selectAll: string;
    selectOne: string;
    insertOne: string;
    updateOne: string;
    deleteMany: string;
    dropdown: string;
    refetchQueries: string[];
    fields: Field[];
    allFields: string;
    allColumns: ColDef[];
};

export const $defs = makeVar(CRUD as Record<keyof typeof CRUD, QueryLiteral>);
export function useCRUD($collection?: string) {
    const collection = useCollectionName($collection) as keyof typeof CRUD;
    const queriesAndMutations: QueryLiteral = $defs()[collection];
    return queriesAndMutations;
}
export function useGraphQL(inCollection?: string) {
    function handleProp(x: string | [string, string[], string?]): string {
        if (Array.isArray(x)) {
            const [objName, nested] = x;
            return `${objName} {
          ${nested.map(handleProp).join('\n')}
        }`;
        }
        return x;
    }
    function handleColumn(x: string | [string, string[], string?]): string[] {
        if (Array.isArray(x)) {
            const [objName, nested, exclude] = x;
            return exclude != null ? [[objName, exclude].join('.')] : nested.map((y) => [objName, y].join('.'));
        }
        return [x];
    }
    const collection = useCollectionName(inCollection);
    const { properties, keyField, headers, calculated } = fields[inCollection ?? collection];
    const allFields = [...properties, ...(calculated ?? [])].map(handleProp).join('\n');
    const allColumns = ['_id', ...properties, ...(calculated ?? [])]
        .map(handleColumn)
        .reduce((pv, cv) => [...pv, ...cv], []);
    console.log('allFields', allFields);
    const camelCaseSingular = kebabToCamelCase(collection);
    const camelCasePlural = pluralize(camelCaseSingular);
    const pascalCaseSingular = capitalize(camelCaseSingular);
    const pascalCasePlural = pluralize(pascalCaseSingular);
    const queryString = {
        selectAll: `query SelectAll${pascalCasePlural} {
                ${camelCasePlural} {
                    _id
                    ${allFields}
                }
            }`,
        search: `query SelectOne${pascalCaseSingular}($query: ${pascalCaseSingular}QueryInput) {
  ${camelCaseSingular}(query: $query) {
    _id
    ${allFields}
  }
}`,
        byId: `query ${pascalCaseSingular}ById($id: ObjectId!) {
  selfStorage(query: { _id: $id }) {
    _id
    ${allFields}
  }
}`,
        update: `mutation Update${pascalCaseSingular}ById($id: ObjectId, $set: ${pascalCaseSingular}UpdateInput!) {
  updateOne${pascalCaseSingular}(set: $set, query: { _id: $id }) {
    _id
  }
}`,
        insert: `mutation Insert${pascalCaseSingular}($data: ${pascalCaseSingular}InsertInput!) {
                insertOne${pascalCaseSingular}(data: $data) {
                    _id
                }
            }`,
        insertQueryName: `insertOne${pascalCaseSingular}`,
        deleteMany: `mutation Delete${pascalCasePlural}($ids: [ObjectId]) {
                deleteMany${pascalCasePlural}(query: { _id_in: $ids }) {
                    deletedCount
                }
            }`,
        dropdown: (apollo as any)[collection].dropdown,
        resultPlural: camelCasePlural,
        refreshGrid: `SelectAll${pascalCasePlural}`
    };
    console.log(queryString);
    return { ...queryString, headers: ['ID', ...headers], properties: ['_id', ...properties], allColumns };
}
