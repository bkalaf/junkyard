import { faRectangleHistoryCircleUser } from '@fortawesome/pro-duotone-svg-icons';
import { useCallback, useRef, useState } from 'react';
import { useCRUD } from '../hooks/useCRUD';
import { buildFormData } from './buildFormData';
import { Field } from './Field';
import { useToggler } from './useToggler';

export function isIn<T>(...values: T[]) {
    return function (item: T) {
        return values.includes(item);
    };
}
export type ControlOptions = {
    validators?: string[];
    calculation?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
export function useForm(fields: Field[]): [
    formRef: React.RefObject<HTMLFormElement>,
    handleSubmit: (cb: (fd: any) => void) => (ev: React.FormEvent<HTMLFormElement>) => void,
    register: (name: string, options?: ControlOptions) => { name: string; id: string },
    onInput: (ev: React.FormEvent<HTMLElement>) => void,
    displayFeedback: boolean,
    errors: Record<string, string[]>
] {
    const registry = useRef<Map<string, ControlOptions>>(new Map());
    const calculations = useRef<any[]>([]);
    const register = useCallback((name: string, options: ControlOptions = {}) => {
        registry.current.set(name, options);
        if (options.calculation != null) {
            calculations.current = [
                ...calculations.current,
                (target: any) => (fd: any) =>
                    ((target.elements.namedItem(name) as any).value = eval(options.calculation!)(fd))
            ];
        }
        return { name, id: `${name}-input` };
    }, []);
    const formRef = useRef<HTMLFormElement | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const validate = useCallback(() => {
        if (formRef.current == null) throw new Error('no form ref');
        const elements = formRef.current.elements;
        const errors = {} as Record<string, string[]>;
        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            switch (element.tagName) {
                case 'INPUT': {
                    const inputEl = element as HTMLInputElement;
                    if (isIn('submit', 'reset', 'cancel')(inputEl.type)) break;
                    const options = registry.current.get(inputEl.name);
                    if (options == null) throw new Error(`unregistered element: ${inputEl.name}`);
                    const validators = options.validators ?? [];
                    const validation = validators
                        .map((x) => {
                            try {
                                eval(x)(inputEl.value);
                                return [];
                            } catch (error) {
                                return [(error as Error).message];
                            }
                        })
                        .reduce((pv, cv) => [...pv, ...cv], inputEl.validity.valid ? [] : [inputEl.validationMessage]);
                    if (validation.length > 0) {
                        errors[inputEl.name] = validation;
                    }
                    break;
                }
                case 'OUTPUT':
                    break;
                case 'SELECT':
                case 'TEXTAREA':
                case 'FIELDSET':
                case 'BUTTON':
                    break;

                default:
                    throw new Error(`unhandled tag: ${element.tagName}`);
            }
        }
        setErrors(errors);
        return errors;
    }, []);
    const [displayFeedback, showFeedback, hideFeedback] = useToggler();
    const handleSubmit = useCallback(
        (cb: (fd: any) => void) => {
            return (ev: React.FormEvent<HTMLFormElement>) => {
                ev.preventDefault();
                ev.stopPropagation();
                const errors = validate();
                hideFeedback();
                if (Object.getOwnPropertyNames(errors).length > 0) {
                    showFeedback();
                    return;
                }
                cb(buildFormData(ev.target as HTMLFormElement, fields));
            };
        },
        [fields, hideFeedback, showFeedback, validate]
    );
    const onInput = useCallback((ev: React.FormEvent<HTMLElement>) => {
        console.log(ev);
        const target = (ev.target as any).form as HTMLFormElement;
        const fd = buildFormData(target, fields);
        calculations.current.map((c) => c(target)(fd));
    }, [fields]);
    return [formRef, handleSubmit, register, onInput, displayFeedback, errors];
}
