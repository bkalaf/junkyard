import * as CRUD from './../config/apollo.json';
import { makeVar } from '@apollo/client';
import { PrimitiveField, NestedObjectField, LocalField, ReferenceField, Field } from './Field';

export type ColDef = { header: string; property: string };
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


