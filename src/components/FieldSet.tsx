import React from 'react';
import { FieldSetContext } from './InsertForm';

export function FieldSet({ name, className, children }: { className?: string; name: string; children?: Children; }) {
    return (
        <FieldSetContext.Provider value={{ objName: name }}>
            <fieldset name={name} className={`grid grid-cols-4 cols-span-4 ${className}`}>
                {children}
            </fieldset>
        </FieldSetContext.Provider>
    );
}
