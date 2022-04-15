import { useCallback } from 'react';
import { useCycler } from '../contexts/useCycler';
import React from 'react';
import { overlayContents } from '../state/index';
import { useOverlayContents } from '../state/useOverlayContents';
import { useReactiveSetter } from './useReactiveSetter';
import { cycleOverlayState } from '../state/cycleOverlayState';
import { OverlayState } from '../state/OverlayState';

export function useOverlay(): [
    contents: JSX.Element[],
    controller: {
        state: OverlayState;
        appendOverlay: (item: JSX.Element) => void;
        popOverlay: () => void;
        onAnimationEnd: () => void;
    }
] {
    const contents = useOverlayContents();
    const setContents = useReactiveSetter(overlayContents);
    const appendOverlay = useCallback(
        (item: JSX.Element) => {
            setContents((prev) => [...prev, item]);
        },
        [setContents]
    );
    const popOverlay = useCallback(() => {
        setContents((prev) => {
            const [head, ...tail] = prev;
            return tail;
        });
    }, [setContents]);
    const [state, cycleState] = useCycler(cycleOverlayState, 'hidden');
    React.useEffect(() => {
        if (contents.length === 0 && state !== 'hidden' && state !== 'hiding') {
            cycleState();
        }
        if (contents.length !== 0 && state !== 'showing' && state !== 'shown') {
            cycleState();
        }
    }, [contents, cycleState, state]);
    const onAnimationEnd = useCallback(() => {
        cycleState();
    }, [cycleState]);
    return [
        contents,
        {
            state,
            appendOverlay,
            popOverlay,
            onAnimationEnd,
        },
    ] as [
        contents: JSX.Element[],
        controller: {
            state: OverlayState;
            appendOverlay: (item: JSX.Element) => void;
            popOverlay: () => void;
            onAnimationEnd: () => void;
        }
    ];
}
