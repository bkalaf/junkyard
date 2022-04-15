import React, { useCallback } from 'react';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastType } from '../contexts/ToasterContext';
import { useAlert } from '../hooks/useAlert';
import { useAuth } from '../hooks/useAuth';
import { useOverlay } from '../hooks/useOverlay';
import { OverlayMount } from './OverlayMount';
import { Toaster } from './Toaster';
import { NotFound, TopBar } from './TopBar';
import { Grid } from './Grid';
import { FacilityInsertForm, InsertForm, SelfStorageInsertForm } from './InsertForm';
import { InsertRecordForm } from "./InsertRecordForm";
import { useCollectionName } from './useCollectionName';

export function ButtonGroup({ children }: { children: Children }) {
    return (
        <ul className='flex flex-row space-x-2 p-0.5'>
            {React.Children.toArray(children).map((x, ix) => (
                <li key={ix} className='flex'>
                    {x}
                </li>
            ))}
        </ul>
    );
}
export function useNavigateBackOne() {
    const navigate = useNavigate();
    return useCallback(() => {
        navigate(-1);
    }, [navigate]);
}

export function MountInsert() {
    const collection = useCollectionName();
    switch (collection) {
        case 'self-storage':
            return <SelfStorageInsertForm />
        case 'facility':
            return <FacilityInsertForm />;

        default:
            return <></>;
    }
}
export function MainWindow() {
    const alert = useAlert(ToastType.INFO);
    const [_, { appendOverlay, popOverlay }] = useOverlay();
    return (
        <div className='relative flex flex-col w-full h-full'>
            <TopBar />
            <div className='flex flex-grow text-white'>
                <Routes>
                    <Route path='data'>
                        <Route path='v1'>
                            <Route path='auctions'>
                                <Route path=':collection'>
                                    <Route path=':id'>
                                        <Route index element={<div className='flex text-white'>Edit</div>} />
                                    </Route>
                                    <Route path='new' element={<MountInsert />} />
                                    <Route index element={<Grid />} />
                                </Route>
                                <Route index element={<Outlet />} />
                            </Route>
                            <Route index element={<Outlet />} />
                        </Route>
                        <Route index element={<Outlet />} />
                    </Route>
                    <Route path='api'>
                        <Route path='v1'></Route>
                        <Route index element={<Outlet />} />
                    </Route>
                    <Route path='queues'></Route>
                    <Route path='files'></Route>
                    <Route path='/' element={<Outlet />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
            <BottomBar />
            <Toaster />
            <OverlayMount />
        </div>
    );
}

export function BottomBar() {
    const location = useLocation();
    const { email } = useAuth();
    return (
        <div className='flex flex-row w-full justify-between items-center p-0.5 bg-black'>
            <span className='inline-flex p-0.5 px-2 text-white border-white border-2 rounded-lg bg-blue-dark'>
                {location.pathname}
            </span>
            <span className='inline-flex p-0.5 px-2 text-white border-white border-2 rounded-lg bg-blue-dark'>
                {email}
            </span>
        </div>
    );
}
