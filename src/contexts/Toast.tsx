import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastProps } from './ToasterContext';
import { cn } from "./cn";
import { ToastState } from "./ToastState";
import { cycleToastState } from "./cycleToastState";
import { useCycler } from "./useCycler";


export function Toast(props: ToastProps) {
    useWhyDidYou('Toast', props);
    const [state, cycleState] = useCycler<ToastState>(cycleToastState, 'animate-in');
    const { className, icon, subtitle, title, body, deleteToast, id, timeout } = useMemo(() => cn(props, {
        bounceInDown: state === 'animate-in',
        fadeOutRight: state === 'animate-out',
        hidden: state === 'stale'
    }, 'flex flex-row w-full duration-1000 delay-150 ease-in mt-2 pointer-events-auto'), [props, state]);
    const cb = useRef<NodeJS.Timeout | null>(null);
    const onClick = useCallback(() => {
        if (cb.current)
            clearTimeout(cb.current);
        cb.current = null;
        cycleState();
    }, [cycleState]);
    const onAnimationEnd = useCallback(() => {
        cycleState();
    }, [cycleState]);
    useEffect(() => {
        if (state === 'waiting') {
            cb.current = setTimeout(() => cycleState(), timeout ?? 12000);
            return () => {
                if (cb.current) {
                    clearTimeout(cb.current);
                    cb.current = null;
                }
            };
        }
        if (state === 'stale') {
            deleteToast(id);
        }
    }, [cycleState, deleteToast, id, state, timeout]);
    return <div className={className} title='Click to dismiss alert.' onAnimationEnd={onAnimationEnd} onClick={onClick} role='button'>
        <div className='flex items-center justify-center'>
            <FontAwesomeIcon size='2x' icon={icon} className='inline-flex m-4' />
        </div>
        <div className='flex flex-col flex-grow space-y-1'>
            <span className='flex text-xl font-bold leading-loose tracking-wider text-center font-fira-sans'>{title}</span>
            <span className='flex text-base font-bold text-center font-fira-sans'>{subtitle}</span>
            <p className='flex px-2 text-base font-normal text-left indent-3 font-fira-sans'>{body}</p>
        </div>
    </div>;
}
