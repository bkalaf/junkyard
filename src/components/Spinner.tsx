import { faSpinner } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export function Spinner() {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <FontAwesomeIcon size='6x' icon={faSpinner} className='inline-flex text-red' />
        </div>
    );
}
