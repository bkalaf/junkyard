import { cloneElement } from 'react';
import { ControlOptions } from './useForm';
import React from 'react';


export function ControlSet({
    children, register
}: {
    children: Children;
    register: (name: string, options?: ControlOptions) => void;
}) {
    return (
        <>
            {React.Children.toArray(children).map((x, ix) => {
                const el: JSX.Element = x as any;
                return cloneElement(el, { key: ix, ...el.props, register });
            })}
        </>
    );
}
