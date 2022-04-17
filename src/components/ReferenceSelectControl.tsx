import { DocumentNode, gql, useQuery } from '@apollo/client';
import React from 'react';
import { useDocumentNodes } from '../hooks/useCRUD';
import { useRegister } from '../hooks/useRegister';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { ofKebabOrCamelCaseToTitle } from './ofKebabOrCamelCaseToTitle';
import { SelectBaseProps } from './SelectControl';
import { useGraphQL } from "./useGraphQL";

export type ReferenceSelectProps = {
    collection: string;
} & SelectBaseProps;

export function ReferenceSelectControl(props: ReferenceSelectProps) {
    useWhyDidYou('ReferenceSelectControl', props);
    const register = useRegister();
    const { name, validators, collection, ...attributes } = props;
    const selectId = `${name}-select`;
    const labelId = `${selectId}-label`;
    const { dropdown } = useDocumentNodes(collection);
    const { data, loading, error } = useQuery<{ options: { key: string; value: string; label: string }[] }>(dropdown as DocumentNode, { onError: e => alert(e.message)});
    return (
        <div className='flex flex-col'>
            <label className='flex' id={labelId} htmlFor={selectId}>
                {ofKebabOrCamelCaseToTitle(name)}
            </label>
            <select className='flex' size={1} {...attributes} {...register(name, { validators })}>
                {loading && <option key={0} value='' label='LOADING DATA...' />}
                {!loading && <option key={0} value='' label='Choose...' />}
                {error && <div>{error.message}</div>}
                {[...data?.options ?? []].sort((a: { label: string }, b: { label: string }) => a.label < b.label ? -1 : a.label === b.label ? 0 : 1).map((x) => (
                    <option value={x.value} label={x.label} key={x.key} />
                ))}
            </select>
        </div>
    );
}
