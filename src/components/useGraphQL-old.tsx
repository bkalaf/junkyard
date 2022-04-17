import * as CRUD from './../config/apollo.json';
import { makeVar } from '@apollo/client';
import { PrimitiveField, NestedObjectField, LocalField, ReferenceField } from './Field';
import { QueryLiteral } from './QueryLiteral';

export const $defs = makeVar(CRUD as Record<keyof typeof CRUD, QueryLiteral>);


