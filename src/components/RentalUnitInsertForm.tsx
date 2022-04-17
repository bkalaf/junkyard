import { InputControl } from './InputControl';
import { ReferenceSelectControl } from "./ReferenceSelectControl";
import React from 'react';
import { InsertRecordForm } from './InsertRecordForm';
import { FieldSet } from "./FieldSet";

export function RentalUnitInsertForm() {
    return <InsertRecordForm>
        <ReferenceSelectControl name='facility' collection='facility' />
        <InputControl name='unit' type='text' required aria-required />
        <FieldSet name='size' className='grid grid-cols-4 col-span-4'>
            <InputControl name='length' type='text' />
            <InputControl name='width' type='text' />
        </FieldSet>
    </InsertRecordForm>;
}
