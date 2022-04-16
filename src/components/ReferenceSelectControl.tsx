import { gql, useQuery } from '@apollo/client';
import React from 'react';
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
    const { dropdown } = useGraphQL(collection);
    const { data, loading } = useQuery<{ options: { key: string; value: string; label: string }[] }>(gql(dropdown));
    return (
        <div className='flex flex-col'>
            <label className='flex' id={labelId} htmlFor={selectId}>
                {ofKebabOrCamelCaseToTitle(name)}
            </label>
            <select className='flex' size={1} {...attributes} {...register(name, { validators })}>
                {loading && <option key={0} value='' label='LOADING DATA...' />}
                {!loading && <option key={0} value='' label='Choose...' />}
                {data?.options.map((x) => (
                    <option value={x.value} label={x.label} key={x.key} />
                ))}
            </select>
        </div>
    );
}
