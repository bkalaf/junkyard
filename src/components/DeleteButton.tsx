import { DocumentNode, gql, useMutation } from '@apollo/client';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import React, { useCallback, useMemo } from 'react';
import { IconButton } from './IconButton';
import { useCRUD, useDocumentNodes } from "../hooks/useCRUD";
import { useSearchParams } from './MenuBar';
import { useLocation } from 'react-router';

export function DeleteButton() {
    const location = useLocation();
    const { deleteMany, refetchQueries } = useDocumentNodes();
    const [mutate, { loading, error, data }] = useMutation<{ count: { deletedCount: number }}, { ids: string[] }>(deleteMany as DocumentNode, { refetchQueries: refetchQueries as any[] });
    const selected = useMemo(() => (new URLSearchParams(location.search).get('selected') ?? '').split('&'), [location.search]);
    console.log('selected', selected);
    const onClick = useCallback(() => {
        mutate({ variables: { ids: selected }, refetchQueries: refetchQueries as any[] }).then(x => console.info(`deleted: ${x.data?.count.deletedCount}`));
    }, [mutate, refetchQueries, selected]);
    return <IconButton icon={faTrash} size='2x' title='Delete records.' onClick={onClick} />;
}
