import { gql, useMutation } from '@apollo/client';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import React, { useCallback } from 'react';
import { IconButton } from './IconButton';
import { useCRUD } from './useGraphQL';
import { useSearchParams } from './MenuBar';

export function DeleteButton() {
    const { deleteMany, refetchQueries } = useCRUD();
    const [mutate, { loading, error, data }] = useMutation<{ count: { deletedCount: number }}, { ids: string[] }>(gql(deleteMany), { refetchQueries: refetchQueries });
    const [selected] = useSearchParams();
    console.log('selected', selected);
    const onClick = useCallback(() => {
        mutate({ variables: { ids: selected } }).then(x => console.info(`deleted: ${x.data?.count.deletedCount}`));
    }, [mutate, selected]);
    return <IconButton icon={faTrash} size='2x' title='Delete records.' onClick={onClick} />;
}
