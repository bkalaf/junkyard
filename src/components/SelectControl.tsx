import { SelectHTMLAttributes } from 'react';
import { useRegister } from '../hooks/useRegister';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { useFieldSetContext } from "../hooks/useFieldSetContext";
import { ofKebabOrCamelCaseToTitle } from './ofKebabOrCamelCaseToTitle';

export type SelectBaseProps = {
    name: string;
    validators?: string[];
} & Partial<SelectHTMLAttributes<HTMLSelectElement>>;

export type SelectProps = {
    optionMap: Record<string, string>;
} & SelectBaseProps;

export function SelectControl(props: SelectProps) {
    useWhyDidYou('SelectControl', props);
    const { name: $name, validators, optionMap, ...attributes } = props;
    const selectId = `${$name}-select`;
    const labelId = `${selectId}-label`;
    const name = useFieldSetContext($name);
    const register = useRegister();
    return (
        <div className='flex flex-col'>
            <label className='flex' htmlFor={selectId} id={labelId}>
                {ofKebabOrCamelCaseToTitle($name)}
            </label>
            <select
                className='flex'
                aria-labelledby={labelId}
                name={name}
                {...attributes}
                {...register(name, { validators })}>
                {Object.entries(optionMap)
                    .sort(([k1, v1], [k2, v2]) => (v1 < v2 ? -1 : v2 > v1 ? 1 : 0))
                    .map(([k, v]) => (
                        <option key={k} label={v} value={k} />
                    ))}
            </select>
        </div>
    );
}
