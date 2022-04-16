import { useCollectionName } from './useCollectionName';
import * as CRUD from '../config/apollo.json';
import { QueryLiteral, $defs } from '../components/useGraphQL-old';

export function useCRUD($collection?: string) {
    const collection = useCollectionName($collection) as keyof typeof CRUD;
    const queriesAndMutations: QueryLiteral = $defs()[collection];
    return queriesAndMutations;
}
