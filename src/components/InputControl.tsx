import { stringify } from 'querystring';
import React, { InputHTMLAttributes, SelectHTMLAttributes } from 'react';
import { useRegister } from '../hooks/useRegister';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { useFieldSetContext } from "../hooks/useFieldSetContext";
import { ofKebabOrCamelCaseToTitle } from './ofKebabOrCamelCaseToTitle';

export type InputProps = {
    name: string;
    validators?: string[];
} & Partial<InputHTMLAttributes<HTMLInputElement>>;

export function InputControl(props: InputProps) {
    useWhyDidYou('InputControl', props);
    const register = useRegister();
    const { name: $name, validators, ...attributes } = props;
    const inputId = `${$name}-input`;
    const labelId = `${inputId}-label`;
    const name = useFieldSetContext($name);
    return (
        <div className='flex flex-col text-lg font-bold font-fira-sans'>
            <label className='flex' htmlFor={inputId} id={labelId}>
                {ofKebabOrCamelCaseToTitle($name)}
            </label>
            <input
                className='flex'
                name={name}
                aria-labelledby={labelId}
                {...attributes}
                {...register!(name, { validators })}
            />
        </div>
    );
}

