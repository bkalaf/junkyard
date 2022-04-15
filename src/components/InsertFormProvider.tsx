import { ControlOptions } from './useForm';
import React from 'react';
import { InsertFormContext } from './InsertForm';


export function InsertFormProvider({
    register, children
}: {
    register: (name: string, options?: ControlOptions) => void;
    children?: Children;
}) {
    return <InsertFormContext.Provider value={{ register }}>{children}</InsertFormContext.Provider>;
}
