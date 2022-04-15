import { useCallback, useMemo, useState } from 'react';
import { Toast } from './Toast';
import { generateRandomString } from './generateRandomString';
import { ToastType } from './ToasterContext';
import { fromToastType } from "./fromToastType";

export function useProvideToaster() {
    const [content, setContent] = useState<React.ReactNode[]>([]);
    const deleteToast = useCallback((id: string) => {
        setContent((prev) => {
            return [...prev.filter((x) => (x as JSX.Element).props.id !== id)];
        });
    }, []);
    const createAlert = useCallback(
        (type: ToastType) => {
            return (body2: string, title2?: string, subtitle2?: string) => {
                const [icon, title1, subtitle1, bg, text] = fromToastType(type);
                const { title, subtitle, body } = {
                    title: title2 ?? title1,
                    subtitle: subtitle2 ?? subtitle1,
                    body: body2,
                };
                const id = generateRandomString(24);
                setContent((prev) => {
                    return [
                        ...prev,
                        <Toast
                            key={id}
                            icon={icon}
                            className={[bg, text].join(' ')}
                            title={title}
                            subtitle={subtitle}
                            body={body}
                            deleteToast={deleteToast}
                            id={id} />,
                    ];
                });
            };
        },
        [deleteToast]
    );
    const { createInfoAlert, createSuccessAlert, createErrorAlert, createFailureAlert, createWarningAlert } = useMemo(
        () => ({
            createInfoAlert: createAlert(ToastType.INFO),
            createSuccessAlert: createAlert(ToastType.SUCCESS),
            createFailureAlert: createAlert(ToastType.FAILURE),
            createErrorAlert: createAlert(ToastType.ERROR),
            createWarningAlert: createAlert(ToastType.WARNING),
        }),
        [createAlert]
    );
    return {
        createInfoAlert,
        createSuccessAlert,
        createErrorAlert,
        createWarningAlert,
        createFailureAlert,
        content,
        createAlert,
    };
}
