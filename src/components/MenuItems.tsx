import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { ofKebabOrCamelCaseToTitle } from './ofKebabOrCamelCaseToTitle';

export function MenuItems(props: { items: [to: string, name?: string][]; }) {
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
                                return `px-3 py-1 font-fira-sans text-base font-bold border-2 items-center border-cyan bg-slate-dark text-center text-white hover:bg-red shadow-lg rounded-lg hover:shadow-red outline outline-2 outline-transparent focus:outline-yellow ${isActive ? 'bg-yellow text-black' : ''}`;
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
