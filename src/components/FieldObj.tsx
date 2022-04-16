import { PrimitiveField, NestedObjectField, LocalField, ReferenceField, Field } from './Field';

export const FieldObj = {
    is: {
        primitive: (x: Field): x is PrimitiveField => typeof x === 'string',
        nestedObj: (x: Field): x is NestedObjectField => Array.isArray(x) && x.length === 2,
        local: (x: Field): x is LocalField => Array.isArray(x) && x.length === 1,
        reference: (x: Field): x is ReferenceField => Array.isArray(x) && x.length === 3
    }
};