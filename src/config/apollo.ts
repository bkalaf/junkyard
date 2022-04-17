///<reference path="./../global.d.ts" />
import { kebabToCamelCase } from '../components/kebabToCamelCase';
import pluralize from '../components/pluralize';
import { capitalize } from '../components/capitalize';
// import * as fs from 'graceful-fs';
import { Field, ReferenceField } from '../components/Field';
import { toAllColumns } from '../components/toAllColumns';
import { toAllFields } from '../components/toAllFields';
import { FieldObj } from '../components/FieldObj';

export function adjustReferenceFields(fields: Field[]) {
    return (formdata: Record<string, any>) => {
        return fields.filter(FieldObj.is.reference).map((x) => {
            const [collection, fieldname, projection] = x as ReferenceField;
            const oid = formdata[fieldname];
            formdata[fieldname] = { link: oid };
            return (fd: Record<string, any>) => {
                fd[fieldname] = { link: oid }
                return fd;
            };
        }).reduce((pv, cv) => cv(pv), formdata);
    };
}
function refetchQueries(collection: string) {
    const camel = { s: kebabToCamelCase(collection), p: pluralize(kebabToCamelCase(collection)) };
    const pascal = { s: capitalize(camel.s), p: capitalize(camel.p) };
    return [`${pascal.p}GridAll`, `${pascal.s}GridOne`, `${pascal.s}Dropdown`];
}
function selectAll(collection: string, sortBy: string, fields: string) {
    const camel = { p: kebabToCamelCase(pluralize(collection)) };
    const pascal = { p: capitalize(camel.p) };
    return `query ${pascal.p}GridAll {
      grid: ${camel.p}(sortBy: ${sortBy}) {
          ${fields}
      }
  }`;
}
function selectOne(collection: string, fields: string) {
    const camel = { s: kebabToCamelCase(collection) };
    const pascal = { s: capitalize(camel.s) };
    return `query ${pascal.s}GridOne($query: ${pascal.s}QueryInput!) {
	record: ${camel.s}(query: $query) {
    ${fields}
  }
}`;
}
function dropdown(collection: string) {
    const camel = { s: kebabToCamelCase(collection), p: pluralize(kebabToCamelCase(collection)) };
    const pascal = { s: capitalize(camel.s) };
    return `query ${pascal.s}Dropdown {\n  options: ${camel.p} {\n    key\n    value\n    label\n  }\n}`;
}
function deleteMany(collection: string) {
    const camel = { s: kebabToCamelCase(collection), p: pluralize(kebabToCamelCase(collection)) };
    const pascal = { s: capitalize(camel.s), p: capitalize(camel.p) };
    return `mutation ${pascal.s}Delete($ids: [ObjectId]) {
  count: deleteMany${pascal.p}(query: { _id_in: $ids }) {
    deletedCount
  }
}`;
}
function insertOne(collection: string, fields: string) {
    const camel = { s: kebabToCamelCase(collection), p: pluralize(kebabToCamelCase(collection)) };
    const pascal = { s: capitalize(camel.s), p: capitalize(camel.p) };
    return `mutation ${pascal.s}Insert($data: ${pascal.s}InsertInput!) {
	inserted: insertOne${pascal.s}(data: $data) {
        ${fields}
  }  
}
`;
}
function updateOne(collection: string, fields: string) {
    const camel = { s: kebabToCamelCase(collection), p: pluralize(kebabToCamelCase(collection)) };
    const pascal = { s: capitalize(camel.s), p: capitalize(camel.p) };
    return `mutation ${pascal.s}Update($id: ObjectId!, $set: ${pascal.s}UpdateInput!) {
  record: updateOne${pascal.s}(query: { _id: $id }, set: $set) {
    _id
    ${fields}
  }
}`;
}

export const apolloEntry = (collection: string, sortBy: string, fields: string, ...properties: Field[]) => {
    const allFields = toAllFields(properties);
    const allColumns = toAllColumns(properties);
    return {
        selectAll: selectAll(collection, sortBy, allFields),
        selectOne: selectOne(collection, allFields),
        insertOne: insertOne(collection, allFields),
        deleteMany: deleteMany(collection),
        updateOne: updateOne(collection, allFields),
        dropdown: dropdown(collection),
        refetchQueries: refetchQueries(collection),
        fields: properties,
        allFields,
        allColumns
    };
};

export type SelectAll<T> = () => { grid: T[] };
export type SelectOne<T> = () => { record: T };
export type Dropdown = () => { options: Array<{ key: string; label: string; value: string }> };
export type DeleteMany = (ids: string[]) => { count: { deletedCount: number } };
export type InsertOne<T> = (data: T) => { inserted: T };

export const apollo = {
    facility: apolloEntry(
        'facility',
        'SELFSTORAGE_ASC',
        'name\nphone\nemail\nfacilityNumber\nselfStorage {\n_id\nname\n}\naddress {\nstreet\nsuite\ncity\nstate\ncountry\npostalCode\n}',
        '_id',
        ['name'],
        'phone',
        'email',
        'facilityNumber',
        ['self-storage', 'selfStorage', ['_id', 'name']],
        ['address', ['street', 'suite', 'city', 'state', 'country', 'postalCode']]
    ),
    'self-storage': apolloEntry('self-storage', 'NAME_ASC', 'name\nwebsite', '_id', 'name', 'website'),
    'rental-unit': apolloEntry(
        'rental-unit', 'UNIT_ASC', 'name\nunit\nsize {\nlength\nwidth\n}\nfacility{\nname\n}', '_id', ['name'], 'unit', ['size', ['length', 'width']], ['rental-unit', 'rentalUnit', ['_id', 'name']]
    )
};

console.log(
    [
        apollo['self-storage'].selectAll,
        apollo['self-storage'].selectOne,
        apollo['self-storage'].deleteMany,
        apollo['self-storage'].dropdown,
        apollo['self-storage'].insertOne,
        apollo['self-storage'].updateOne
    ].join('\n')
);

// fs.writeFileSync('apollo.json', JSON.stringify(apollo));
