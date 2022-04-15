import { createContext } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ignore } from '../state';

export enum ToastType {
    INFO,
    WARNING,
    ERROR,
    SUCCESS,
    FAILURE,
}

export type AlertCreator = (body: string, title?: string, subtitle?: string) => void;
export type IToasterContext = {
    createAlert(type: ToastType, title: string, subtitle: string, body: string): void;
    createInfoAlert: AlertCreator;
    createSuccessAlert: AlertCreator;
    createFailureAlert: AlertCreator;
    createWarningAlert: AlertCreator;
    createErrorAlert: AlertCreator;
    content: React.ReactNode[];
};

export const ToasterContext = createContext<IToasterContext | null>(null);

export type ToastProps = {
    icon: IconDefinition;
    title: string;
    subtitle: string;
    body: string;
    id: string;
    className: string;
    deleteToast: (id: string) => void;
    timeout?: number;
};
