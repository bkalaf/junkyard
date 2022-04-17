import { useCallback, useState } from 'react';

export function useToggler(
    initial = false
): [toggle: boolean, toggleOn: () => void, toggleOff: () => void, toggler: () => void] {
    const [toggle, setToggle] = useState(initial);
    const toggleOn = useCallback(() => setToggle(true), []);
    const toggleOff = useCallback(() => setToggle(false), []);
    const toggler = useCallback(() => setToggle((prev) => !prev), []);
    return [toggle, toggleOn, toggleOff, toggler];
}
