import { gql, makeVar, useMutation } from '@apollo/client';
import { faSquarePlus, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { IconButton, IconLinkButton } from './IconButton';
import { MenuItems } from './TopBar';
import { useGraphQL } from './useGraphQL';

export function useSearchParams(
    nav = false
): [
    selected: string[],
    appendSelected: (item: string) => void,
    overwriteSelected: (item: string) => void,
    deleteSelected: (item: string) => void,
    isSelected: (item: string) => boolean
] {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState(new URLSearchParams(location.search));
    const appendSelected = useCallback((item: string) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev.toString());
            const current = params.get('selected') ? [params.get('selected')] : [];
            params.set('selected', [...current, item].join('&'));
            return params;
        });
    }, []);
    const overwriteSelected = useCallback((item: string) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev.toString());
            params.set('selected', item);
            return params;
        });
    }, []);
    const removeSelected = useCallback((item: string) => {
        setSearchParams((prev) => {
            const params = new URLSearchParams(prev.toString());
            const current = params.get('selected')?.split('&').filter(x => x !== item) ?? [];
            params.set('selected', current.join('&'));
            return params;
        });
    }, []);
    const isSelected = useCallback(
        (item: string) => {
            return searchParams.get('selected')?.split('&').includes(item) ?? false;
        },
        [searchParams]
    );
    const search = useMemo(() => searchParams.toString(), [searchParams]);
    useEffect(() => {
        if (nav) navigate(`${location.pathname}?${search}`);
    }, [location.pathname, navigate, search, nav]);
    const selected = useMemo(() => searchParams.get('selected')?.split('&') ?? [], [searchParams]);
    return [selected, appendSelected, overwriteSelected, removeSelected, isSelected];
}

export function DeleteButton() {
    const { deleteMany, refreshGrid } = useGraphQL();
    const [mutate, { loading, error, data }] = useMutation(gql(deleteMany), { refetchQueries: [refreshGrid] });
    const [selected] = useSearchParams();
    console.log('selected', selected);
    const onClick = useCallback(() => {
        mutate({ variables: { ids: selected } });
    }, [mutate, selected]); 
    return <IconButton icon={faTrash} size='2x' title='Delete records.' onClick={onClick} />;
}
export function MenuBar() {
    return (
        <div className='flex items-center'>
            <Routes>
                <Route path='data'>
                    <Route path='v1'>
                        <Route path='auctions'>
                            <Route path=':collection'>
                                <Route path=':id'>
                                    <Route index element={<>Edit</>} />
                                </Route>
                                <Route path='new' element={<>Insert</>} />
                                <Route
                                    index
                                    element={
                                        <>
                                            <IconLinkButton
                                                icon={faSquarePlus}
                                                size='2x'
                                                title='Insert a new record.'
                                                to='new'
                                            />
                                            <DeleteButton />
                                        </>
                                    }
                                />
                            </Route>
                            <Route
                                index
                                element={
                                    <MenuItems
                                        items={[['self-storage'], ['facility'], ['rental-unit'], ['purchase']]}
                                    />
                                }
                            />
                        </Route>
                        <Route
                            index
                            element={<MenuItems items={[['auctions'], ['products'], ['inventory'], ['listing']]} />}
                        />
                    </Route>
                    <Route index element={<Navigate to='v1' />} />
                </Route>
                <Route path='api'>
                    <Route path='v1'></Route>
                    <Route index element={<Navigate to='v1' />} />
                </Route>
                <Route path='queues'></Route>
                <Route path='files'></Route>
                <Route path='/' element={<MenuItems items={[['api'], ['data'], ['queues'], ['files']]}></MenuItems>} />
                <Route path='*' element={<Outlet />} />
            </Routes>
        </div>
    );
}
