import { ReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { Monoid } from '../state/Monoid';

export function useReactiveSetter<T>(variable: ReactiveVar<T>) {
    const setVar = useCallback(
        (updater: Monoid<T> | T) => {
            variable(typeof updater === 'function' ? (updater as Monoid<T>)(variable()) : updater);
        },
        [variable]
    );
    return setVar;
}
