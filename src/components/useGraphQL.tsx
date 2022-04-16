import { fields } from './TopBar';
import { capitalize } from './capitalize';
import pluralize from './pluralize';
import { kebabToCamelCase } from './kebabToCamelCase';
import { useCollectionName } from '../hooks/useCollectionName';
import { apollo } from '../config/apollo';

/**
 * @deprecated
 */

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
