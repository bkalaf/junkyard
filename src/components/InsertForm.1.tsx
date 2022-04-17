import { DocumentNode, gql, useApolloClient, useMutation } from '@apollo/client';
import { useCallback, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { generateRandomString } from '../contexts/generateRandomString';
import { ToastType } from '../contexts/ToasterContext';
import { useAlert } from '../hooks/useAlert';
import { useGraphQL } from './useGraphQL';
import { useForm } from './useForm';
import { Spinner } from './Spinner';
import { useOverlay } from '../hooks/useOverlay';
import React from 'react';
import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { InsertFormProvider } from './InsertFormProvider';
import { tryInvoke } from './tryInvoke';
import { InsertFormProps } from './InsertForm';
import { useRequireAuth } from './useRequireAuth';
import { useCRUD, useDocumentNodes } from '../hooks/useCRUD';
import { ofKebabOrCamelCaseToTitle } from './ofKebabOrCamelCaseToTitle';
import pluralize from './pluralize';
import { Field } from './Field';

export function InsertForm<T extends { _id: string }, E extends Error>(props: InsertFormProps<T>) {
    useWhyDidYou('InsertForm', props);
    useRequireAuth();
    const {
        success: {
            navigate: successNav,
            toastBody: successBody,
            toastSubtitle: successSubtitle,
            toastTitle: successTitle
        },
        failure: { toastBody: failureBody, toastSubtitle: failureSubtitle, toastTitle: failureTitle },
        children
    } = props;
    const [_, { appendOverlay, popOverlay }] = useOverlay();
    const id = useMemo(() => generateRandomString(24), []);
    const { selectAll, insertOne, fields, refetchQueries } = useDocumentNodes();
    console.log(`refetchQueries`, refetchQueries);
    const [ref, handleSubmit, register, onInput, displayFeedback, errors] = useForm(fields as Field[]);
    const navigate = useNavigate();
    const toSuccessToast = useAlert(ToastType.SUCCESS);
    const toFailureToast = useAlert(ToastType.FAILURE);
    const client = useApolloClient();
    const selectAllNode = useMemo(() => selectAll, [selectAll]);
    const onSuccess = useCallback(
        (data: Record<string, T>) => {
            const fd = data.inserted as T;
            toSuccessToast(
                tryInvoke(successBody, '')(fd) ?? '',
                tryInvoke(successTitle, '')(fd),
                tryInvoke(successSubtitle, '')(fd)
            );
            client.refetchQueries({ include: [selectAll as DocumentNode] }).then(() => {
                navigate(tryInvoke(successNav, '/')(fd) ?? '/');
                popOverlay();
            });
        },
        [
            client,
            navigate,
            popOverlay,
            selectAll,
            successBody,
            successNav,
            successSubtitle,
            successTitle,
            toSuccessToast
        ]
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
        { data: { name: string; website?: string } }
    >(insertOne as DocumentNode, {
        onCompleted: onSuccess,
        onError: onFailure as any,
        refetchQueries: 'all'
    });
    const onSubmit = useMemo(
        () =>
            handleSubmit((fd: { name: string; website?: string }) => {
                console.log('formdata', fd);
                mutate({
                    variables: {
                        data: fd
                    },
                    refetchQueries: [selectAll as DocumentNode]
                });
            }),
        [handleSubmit, mutate, selectAll]
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
                            className='flex px-3 py-1 text-lg font-bold leading-loose tracking-wider text-white border-white rounded-lg shadow-lg bg-slate-dark hover:shadow-yellow focus:outline-red'
                        />
                        <input
                            type='submit'
                            className='flex px-3 py-1 text-lg font-bold leading-loose tracking-wider text-white border-white rounded-lg shadow-lg bg-slate-dark hover:shadow-yellow focus:outline-red'
                        />
                    </footer>
                </form>
            </InsertFormProvider>
        );
    }, []);
    return <>{loading && <Spinner />}</>;
}
