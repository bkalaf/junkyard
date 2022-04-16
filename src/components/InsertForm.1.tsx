import { gql, useMutation } from '@apollo/client';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { generateRandomString } from '../contexts/generateRandomString';
import { ToastType } from '../contexts/ToasterContext';
import { useAlert } from '../hooks/useAlert';
import { useGraphQL } from "./useGraphQL";
import { useForm } from './useForm';
import { Spinner } from './Spinner';
import { useOverlay } from '../hooks/useOverlay';
import React from 'react';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { InsertFormProvider } from './InsertFormProvider';
import { tryInvoke } from './tryInvoke';
import { InsertFormProps } from './InsertForm';


export function InsertForm<T extends { _id: string; }, E extends Error>(props: InsertFormProps<T>) {
    useWhyDidYou('InsertForm', props);
    const {
        success: {
            navigate: successNav, toastBody: successBody, toastSubtitle: successSubtitle, toastTitle: successTitle
        }, failure: { toastBody: failureBody, toastSubtitle: failureSubtitle, toastTitle: failureTitle }, children
    } = props;
    const [_, { appendOverlay, popOverlay }] = useOverlay();
    const id = useMemo(() => generateRandomString(24), []);
    const [ref, handleSubmit, register, onInput, displayFeedback, errors] = useForm();
    const { insert, insertQueryName } = useGraphQL();
    const navigate = useNavigate();
    const toSuccessToast = useAlert(ToastType.SUCCESS);
    const toFailureToast = useAlert(ToastType.FAILURE);
    const onSuccess = useCallback(
        (data: Record<string, T>) => {
            const fd = data[insertQueryName] as T;
            toSuccessToast(
                tryInvoke(successBody, '')(fd) ?? '',
                tryInvoke(successTitle, '')(fd),
                tryInvoke(successSubtitle, '')(fd)
            );
            navigate(tryInvoke(successNav, '/')(fd) ?? '/');
            popOverlay();
        },
        [insertQueryName, navigate, popOverlay, successBody, successNav, successSubtitle, successTitle, toSuccessToast]
    );
    const onFailure = useCallback(
        (err: E) => {
            toFailureToast(
                tryInvoke(failureBody, err?.message)(err) ?? '',
                tryInvoke(failureTitle, 'FAILURE')(err),
                tryInvoke(failureSubtitle, err?.name)(err)
            );
        },
        [failureBody, failureSubtitle, failureTitle, toFailureToast]
    );
    const [mutate, { loading, called, error }] = useMutation<
        Record<string, T>,
        { data: { name: string; website?: string; }; }
    >(gql(insert), { onCompleted: onSuccess, onError: onFailure as any });
    const onSubmit = useMemo(
        () => handleSubmit((fd: { name: string; website?: string; }) => {
            console.log('formdata', fd);
            mutate({
                variables: {
                    data: fd
                }
            });
        }),
        [handleSubmit, mutate]
    );
    useEffect(() => {
        appendOverlay(
            <InsertFormProvider register={register}>
                <form
                    id={id}
                    ref={ref}
                    onInput={onInput}
                    className='grid items-center justify-center grid-cols-4 mx-auto'
                    onSubmit={onSubmit}>
                    {children}
                    <footer className='flex flex-row items-center justify-center col-span-3'>
                        <input
                            type='reset'
                            className='flex px-3 py-1 text-lg font-bold leading-loose tracking-wider text-white border-white rounded-lg shadow-lg bg-slate-dark hover:shadow-yellow focus:outline-red' />
                        <input
                            type='submit'
                            className='flex px-3 py-1 text-lg font-bold leading-loose tracking-wider text-white border-white rounded-lg shadow-lg bg-slate-dark hover:shadow-yellow focus:outline-red' />
                    </footer>
                </form>
            </InsertFormProvider>
        );
    }, []);
    return <>{loading && <Spinner />}</>;
}
