import { useContext } from 'react';
import { InsertFormContext } from '../components/InsertForm';

export function useRegister() {
    const context = useContext(InsertFormContext);
    if (context == null || context.register == null) throw new Error('null register');
    return context.register;
}
