import { ToastType } from '../contexts/ToasterContext';
import { fromToastType } from "../contexts/fromToastType";
import { generateRandomString } from '../contexts/generateRandomString';
import { Toast } from '../contexts/Toast';
import { useCallback } from 'react';
import { toasts } from '../state/index';
import { useReactiveSetter } from './useReactiveSetter';

export function useAlert(type: ToastType) {
    const setToasts = useReactiveSetter(toasts);
    const deleteToast = useCallback(
        (id: string) => {
            setToasts((prev) => prev.filter((x) => x.props.id !== id));
        },
        [setToasts]
    );
    const appendToast = useCallback(
        (body: string, title2?: string, subtitle2?: string) => {
            const [icon, title1, subtitle1, bg, text] = fromToastType(type);
            const { title, subtitle } = { title: title2 ?? title1, subtitle: subtitle2 ?? subtitle1 };
            const id = generateRandomString(24);
            setToasts((prev) => [
                ...prev,
                <Toast
                    key={id}
                    id={id}
                    body={body}
                    title={title}
                    subtitle={subtitle}
                    className={[bg, text].join(' ')}
                    icon={icon}
                    deleteToast={deleteToast}
                />,
            ]);
        },
        [deleteToast, setToasts, type]
    );
    return appendToast;
}
