import { InputControl } from './InputControl';
import { ReferenceSelectControl } from "./ReferenceSelectControl";
import React from 'react';
import { InsertRecordForm } from './InsertRecordForm';
import { SelectControl } from './SelectControl';
import { stateMap, countryMap } from './InsertForm';
import { FieldSet } from "./FieldSet";

export function FacilityInsertForm() {
    return (
        <InsertRecordForm>
            <InputControl name='facilityNumber' type='text' />
            <InputControl name='phone' type='tel' />
            <InputControl name='email' type='email' />
            <ReferenceSelectControl name='selfStorage' collection='self-storage' />
            <FieldSet name='address' className='grid grid-cols-3 col-span-3'>
                <InputControl name='street' type='text' />
                <InputControl name='suite' type='text' placeholder='ex: Unit 1712' />
                <InputControl name='city' type='text' required />
                <SelectControl defaultValue='CA' name='state' optionMap={stateMap} />
                <SelectControl defaultValue='US' name='country' optionMap={countryMap} />
                <InputControl
                    name='postalCode'
                    type='text'
                    pattern='^[0-9]{5}([-]?[0-9]{4})?$|^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$'
                    placeholder='ex: 92104 or 92104-9999 or A1E 9C8' />
            </FieldSet>
        </InsertRecordForm>
    );
}
