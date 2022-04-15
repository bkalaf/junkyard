import { useCallback, useState } from 'react';
import { Monoid } from '../state/Monoid';

export function useCycler<T>(converter: Monoid<T>, initial: T): [T, () => void] {
    const [state, setState] = useState<T>(initial);
    const cycleState = useCallback(() => {
        setState(converter);
    }, [converter]);
    return [state, cycleState];
}
