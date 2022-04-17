import { adjustReferenceFields } from '../config';
import { Field } from './Field';
import { setProp } from './setProp';


export function buildFormData(el: HTMLFormElement, fields: Field[]) {
    const formData = new FormData(el);
    return adjustReferenceFields(fields)(
        Array.from(formData.entries()).reduce((pv, [name, value]) => {
            return setProp(name, value)(pv);
        }, {} as Record<string, any>)
    );
}
