import React from 'react';
import { ToastType } from '../contexts/ToasterContext';
import { useAlert } from '../hooks/useAlert';
import { useAuth } from '../hooks/useAuth';
import { useForm } from './useForm';


export function LogIn(props: { onSuccess: () => void; }) {
    const { logIn, email } = useAuth();
    const successToast = useAlert(ToastType.SUCCESS);
    const failureToast = useAlert(ToastType.FAILURE);
    const [ref, handleSubmit, register, onInput, displayFeedback, errors] = useForm([]);

    return (
        <form
            id='12345'
            className='flex flex-col'
            onSubmit={handleSubmit(({ email, password }: { email: string, password: string }) => {
                logIn({email, password}).then(() => successToast(`Welcome back, ${email}`, 'Success', 'Log-in')).then(props.onSuccess).catch(e => failureToast((e as Error).message, 'Failed', 'Log-in'));                
            })}
            onInput={onInput}
            // eslint-disable-next-line react/no-unknown-property
            ref={ref}
        >
            <label htmlFor='email-input'>Email</label>
            <input
                className='flex'
                type='email'
                {...register('email')} />
            <label htmlFor='password-input'>Password</label>
            <input
                className='flex'
                type='password'
                {...register('password', {
                    validators: [
                        `x => {
                        if (x.split("").some(y => y.toLowerCase() === y)) {
                            return;
                        }
                        throw new Error('must have a lowercase letter');
                    }`
                    ]
                })} />
            <output
                {...register('result', { calculation: "fd => fd.email + '::' + fd.password" })} />
            <input type='submit' />
        </form>
    );
}
