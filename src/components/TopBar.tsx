import { faHome, faSquareCaretLeft } from '@fortawesome/pro-duotone-svg-icons';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useOverlay } from '../hooks/useOverlay';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { Button, IconButton } from './IconButton';
import { LogIn } from './LogIn';
import { useNavigateBackOne, ButtonGroup } from './MainWindow';
import { MenuBar } from './MenuBar';

export type GridProps = {
    fields: string[];
};

export const fields: Record<
    string,
    { calculated?: string[], properties: (string | [string, string[], string?])[]; keyField: string; headers: string[] }
> = {
    'self-storage': {
        properties: ['name', 'website'],
        keyField: 'name',
        headers: ['Name', 'Website']
    },
    facility: {
        properties: [
            'facilityNumber',
            'phone',
            'email',
            ['selfStorage', ['_id', 'name'], 'name'],
            ['address', ['street', 'suite', 'city', 'state', 'country', 'postalCode']]
        ],
        calculated: ['name'],
        keyField: 'name',
        headers: ['Facility Number', 'Phone', 'Email', 'Self Storage', 'Street', 'Suite', 'City', 'State', 'Country', 'Postal Code', 'Name']
    }
};
export function TopBar() {
    const nav = useNavigate();
    const navigateBackOne = useNavigateBackOne();
    const [_, { appendOverlay, popOverlay }] = useOverlay();
    const { logIn, logOut, register, isAuthenticated } = useAuth();
    return (
        <div className='flex flex-row justify-between w-full py-0.5 bg-blue-dark border-2 border-white shadow-black shadow-xl rounded-lg'>
            <div className='flex items-center justify-start space-x-3'>
                <ButtonGroup>
                    <IconButton title='Nabooleanvigate home' icon={faHome} size='2x' onClick={() => nav('/')} />
                    <IconButton
                        title='Navigate back one (1) page'
                        icon={faSquareCaretLeft}
                        size='2x'
                        onClick={navigateBackOne}
                    />
                </ButtonGroup>
                <MenuBar />
            </div>
            <ButtonGroup>
                {!isAuthenticated && (
                    <Button
                        bg='bg-red text-lg px-3 font-bold'
                        onClick={() => {
                            appendOverlay(<LogIn onSuccess={popOverlay} />)
                        }}>
                        LogIn
                    </Button>
                )}
                {isAuthenticated && (
                    <Button bg='bg-red text-lg px-3 font-bold' onClick={logOut}>
                        LogOut
                    </Button>
                )}
            </ButtonGroup>
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function Modal(props: { Component: React.FunctionComponent<{ onSuccess: () => void }> }) {
    useWhyDidYou('Modal', props);
    const [_, { appendOverlay, popOverlay }] = useOverlay();
    const { Component } = props;
    useEffect(() => {
        appendOverlay(<Component onSuccess={popOverlay} />);
    }, [Component, appendOverlay, popOverlay]);
    return null;
}