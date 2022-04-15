import { faHome, faSquareCaretLeft } from '@fortawesome/pro-duotone-svg-icons';
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useOverlay } from '../hooks/useOverlay';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { Button, IconButton } from './IconButton';
import { LogIn } from './LogIn';
import { useNavigateBackOne, ButtonGroup } from './MainWindow';
import { MenuBar } from './MenuBar';

export function NotFound() {
    return (
        <div className='flex items-center justify-center'>
            <div className='flex text-3xl font-bold text-white font-fira-sans'>NOT FOUND</div>
        </div>
    );
}

export function isUpper(s: string) {
    return s.toUpperCase() === s && s.toLowerCase() !== s;
}
export function capitalize(s: string) {
    if (s.length === 0) return '';
    return [s[0].toUpperCase(), s.slice(1)].join('');
}
export function decapitalize(s: string) {
    if (s.length === 0) return '';
    return [s[0].toLowerCase(), s.slice(1)].join('');
}
export function splitAt<T>(predicate: (x: T) => boolean) {
    return function (arr: T[], accum: T[][] = [], current: T[] = []): T[][] {
        if (arr.length === 0) return [...accum, current];
        const [head, ...tail] = arr;
        if (predicate(head)) {
            return splitAt(predicate)(tail, [...accum, current], [head]);
        }
        return splitAt(predicate)(tail, accum, [...current, head]);
    };
}
export function ofKebabOrCamelCaseToTitle(str: string) {
    if (str.includes('-')) {
        return str.split('-').map(capitalize).join(' ');
    } else if (str.split('').some(isUpper)) {
        return splitAt((x: string) => /[A-Z]/.test(x))(str.split(''))
            .map((x) => capitalize(x.join('')))
            .join(' ');
    }
    return capitalize(str);
}
console.log(ofKebabOrCamelCaseToTitle('self-storage'));
console.log(ofKebabOrCamelCaseToTitle('selfStorage'));
console.log(ofKebabOrCamelCaseToTitle('self'));

export function MenuItems(props: { items: [to: string, name?: string][] }) {
    useWhyDidYou('MenuItems', props);
    const { items } = props;
    return (
        <ul className='flex flex-row space-x-2 py-0.5'>
            {items.map(([to, name], ix) => {
                const label = name ?? ofKebabOrCamelCaseToTitle(to);
                return (
                    <li key={ix} className='flex items-center'>
                        <NavLink
                            to={to}
                            className={({ isActive }) => {
                                return `px-3 py-1 font-fira-sans text-base font-bold border-2 items-center border-cyan bg-slate-dark text-center text-white hover:bg-red shadow-lg rounded-lg hover:shadow-red outline outline-2 outline-transparent focus:outline-yellow ${
                                    isActive ? 'bg-yellow text-black' : ''
                                }`;
                            }}>
                            {label}
                        </NavLink>
                    </li>
                );
            })}
            <Outlet />
        </ul>
    );
}

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
                        onClick={() => appendOverlay(<LogIn onSuccess={popOverlay} />)}>
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
