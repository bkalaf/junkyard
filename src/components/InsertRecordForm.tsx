import { useMemo } from 'react';
import React from 'react';
import { InsertForm } from "./InsertForm.1";


export function InsertRecordForm<T extends { _id: string; }>({
    children
}: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    children: Children;
}) {
    const success = useMemo(
        () => ({
            toastBody: (data: T) => `You have successfully inserted (1) item.`,
            toastSubtitle: (fd: T) => fd._id,
            toastTitle: (fd: { _id: string; }) => 'SUCCESS!',
            navigate: () => '..'
        }),
        []
    );
    const failure = useMemo(
        () => ({
            toastBody: (err: Error) => err.message,
            toastTitle: (err: Error) => err.name,
            toastSubtitle: (err: Error) => ''
        }),
        []
    );
    return (
        <InsertForm success={success} failure={failure}>
            {children}
        </InsertForm>
    );
}
