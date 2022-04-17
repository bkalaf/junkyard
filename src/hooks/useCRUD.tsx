import { useCollectionName } from './useCollectionName';
import * as CRUD from '../config/apollo.json';
import { $defs } from '../components/useGraphQL-old';
import { ColDef } from "../components/ColDef";
import { ConvertedQueryLiteral, QueryLiteral } from "../components/QueryLiteral";
import { useRef } from 'react';
import { DocumentNode, gql, useReactiveVar } from '@apollo/client';
import { Field } from '../components/Field';

export function useCRUD($collection?: string) {
    const collection = useCollectionName($collection) as keyof typeof CRUD;
    const queriesAndMutations: QueryLiteral = $defs()[collection];
    return queriesAndMutations;
}

export function useDocumentNodes($collection?: string): ConvertedQueryLiteral {
    const cache = useRef<Map<string, ConvertedQueryLiteral>>(new Map());
    const collection = useCollectionName($collection);
    const queriesAndMutations = useReactiveVar($defs);
    const nodes = queriesAndMutations[collection as keyof typeof queriesAndMutations];
    if (cache.current.has(collection)) {
        return cache.current.get(collection)!;
    }
    const obj = Object.fromEntries(Array.from(Object.entries(nodes)).map(([k, v]) => [k, typeof v === 'string' && k !== 'allFields'
     ? gql(v) : v ])) as ConvertedQueryLiteral;
    cache.current.set(collection, obj as ConvertedQueryLiteral);
    return obj;
}