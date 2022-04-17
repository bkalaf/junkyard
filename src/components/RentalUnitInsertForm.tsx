import { InputControl } from './InputControl';
import { ReferenceSelectControl } from "./ReferenceSelectControl";
import React from 'react';
import { InsertRecordForm } from './InsertRecordForm';
import { FieldSet } from "./FieldSet";

export function RentalUnitInsertForm() {
    return <InsertRecordForm preSubmit={(fd: any) => ({ ...fd, closeDate: new Date(Date.parse(fd.closeDate)) })}>
        <ReferenceSelectControl name='facility' collection='facility' />
        <InputControl name='closeDate' type='datetime-local' required pattern='^[01][0-9]-[0-3][0-9]-202[0-9]$' />
        <InputControl name='unit' type='text' required aria-required />
        <FieldSet name='size' className='grid grid-cols-4 col-span-4'>
            <InputControl name='length' type='text' />
            <InputControl name='width' type='text' />
        </FieldSet>
    </InsertRecordForm>;
}
