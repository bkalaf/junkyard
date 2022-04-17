import { Field } from './Field';
import { ColDef } from "./ColDef";
import { DocumentNode } from 'graphql';

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

export type ConvertedQueryLiteral = {
    selectAll: DocumentNode;
    selectOne: DocumentNode;
    insertOne: DocumentNode
    deleteMany: DocumentNode
    dropdown: DocumentNode
    refetchQueries: string[];
    fields: Field[];
    allFields: string;
    allColumns: ColDef[];
}