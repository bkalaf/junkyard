import { useReactiveVar } from '@apollo/client';
import { toasts } from './index';


export function useToaster() {
    return useReactiveVar(toasts);
}
