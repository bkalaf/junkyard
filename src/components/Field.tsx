export type PrimitiveField = string;
export type NestedObjectField = [objectName: string, properties: Field[]];
export type LocalField = [fieldName: Field];
export type ReferenceField = [collection: string, fieldName: string, projection: Field[]];
export type Field = PrimitiveField | NestedObjectField | LocalField | ReferenceField;
