import { gql, useQuery } from '@apollo/client';
import { stringify } from 'querystring';
import React, { InputHTMLAttributes, SelectHTMLAttributes, useContext } from 'react';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { InsertFormContext } from './InsertForm';
import { ofKebabOrCamelCaseToTitle } from './TopBar';
import { ControlOptions } from './useForm';
import { useGraphQL } from './useGraphQL';

export type InputProps = {
    name: string;
    validators?: string[];
} & Partial<InputHTMLAttributes<HTMLInputElement>>;

export function useRegister() {
    const context = useContext(InsertFormContext);
    if (context == null || context.register == null) throw new Error('null register');
    return context.register;
}
export function InputControl(props: InputProps) {
    useWhyDidYou('InputControl', props);
    const register = useRegister();
    const { name, validators, ...attributes } = props;
    const inputId = `${name}-input`;
    const labelId = `${inputId}-label`;
    return (
        <div className='flex flex-col'>
            <label className='flex' htmlFor={inputId} id={labelId}>
                {ofKebabOrCamelCaseToTitle(name)}
            </label>
            <input
                className='flex'
                aria-aria-labelledby={labelId}
                {...attributes}
                {...register!(name, { validators })}
            />
        </div>
    );
}
export type SelectProps = {
    name: string;
    validators?: string[];
    collection: string;
} & Partial<SelectHTMLAttributes<HTMLSelectElement>>;

export function SelectControl(props: SelectProps) {
    useWhyDidYou('SelectControl', props);
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
