import { InputControl } from './InputControl';
import React from 'react';
import { InsertRecordForm } from './InsertRecordForm';


export function SelfStorageInsertForm() {
    return (
        <InsertRecordForm>
            <InputControl name='name' type='text' required />
            <InputControl name='website' type='url' />
        </InsertRecordForm>
    );
}
