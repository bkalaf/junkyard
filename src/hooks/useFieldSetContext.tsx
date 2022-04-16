import { useContext } from 'react';
import { FieldSetContext } from '../components/InsertForm';

export function useFieldSetContext(elName: string) {
    const context = useContext(FieldSetContext);
    return context?.objName == null ? elName : [context?.objName, elName].join('.');
}
