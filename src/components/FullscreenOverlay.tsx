import { useReactiveVar } from '@apollo/client';
import { faWindowClose } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo } from 'react';
import { cn } from '../contexts/cn';
import { useOverlay } from '../hooks/useOverlay';
import { overlayContents } from '../state';

export function FullscreenOverlay() {
    const [_, { onAnimationEnd, state, popOverlay }] = useOverlay();
    const contents = useReactiveVar(overlayContents);
    const { className } = cn(
        {},
        {
            slideInDown: state === 'showing',
            slideOutUp: state === 'hiding',
            hidden: state === 'hidden',
        },
        'flex w-full h-full p-8'
    );
    const children = useMemo(
        () =>
            contents.map((x, ix) => (
                <li
                    key={ix}
                    className='hidden first:flex only:flex'
                >
                    {x}
                </li>
            )),
        [contents]
    );
    return (
        <div
            className={className}
            onAnimationEnd={onAnimationEnd}
        >
            <div className='container relative flex items-center justify-center mx-auto border-2 border-black pointer-events-auto bg-slate-dark'>
                <button
                    className='absolute inline-flex right-0 mr-1.5 mt-1.5 top-0 text-white'
                    type='button'
                    onClick={popOverlay}
                >
                    <FontAwesomeIcon
                        icon={faWindowClose}
                        size='2x'
                    />
                </button>
                <ul>{children}</ul>
            </div>
        </div>
    );
}
