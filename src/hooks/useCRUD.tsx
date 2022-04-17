import { useCollectionName } from './useCollectionName';
import * as CRUD from '../config/apollo.json';
import { QueryLiteral, $defs, ColDef } from '../components/useGraphQL-old';
import { useRef } from 'react';
import { DocumentNode, gql, useReactiveVar } from '@apollo/client';
import { Field } from '../components/Field';

export function useCRUD($collection?: string) {
    const collection = useCollectionName($collection) as keyof typeof CRUD;
    const queriesAndMutations: QueryLiteral = $defs()[collection];
    return queriesAndMutations;
}

export function useDocumentNodes($collection?: string) {
    const cache = useRef<Map<string, Record<string, string | DocumentNode | Field[] | ColDef[]>>>(new Map());
    const collection = useCollectionName($collection);
    const queriesAndMutations = useReactiveVar($defs);
    const nodes = queriesAndMutations[collection as keyof typeof queriesAndMutations];
    if (cache.current.has(collection)) {
        return cache.current.get(collection)!;
    }
    const obj = Object.fromEntries(Array.from(Object.entries(nodes)).map(([k, v]) => [k, typeof v === 'string' && k !== 'allFields'
     ? gql(v) : v ]));
    cache.current.set(collection, obj);
    return obj;
}