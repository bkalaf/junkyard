import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faBug,
    faExclamationCircle,
    faThumbsDown,
    faThumbsUp,
    faTrafficCone
} from '@fortawesome/pro-duotone-svg-icons';
import { ToastType } from './ToasterContext';


export function fromToastType(
    type: ToastType
): [icon: IconDefinition, title: string, subtitle: string, bg: string, text: string] {
    switch (type) {
        case ToastType.INFO:
            return [faExclamationCircle, 'Information', 'FYI', 'bg-cyan', 'text-black'];
        case ToastType.ERROR:
            return [faBug, 'ERROR', 'Error caught.', 'bg-black', 'text-white'];
        case ToastType.FAILURE:
            return [faThumbsDown, 'FAILURE', 'Action did not succeed.', 'bg-red', 'text-white'];
        case ToastType.WARNING:
            return [faTrafficCone, 'WARNING', 'Caution', 'bg-amber', 'text-white'];
        case ToastType.SUCCESS:
            return [faThumbsUp, 'SUCCESS', 'Action succeeded!', 'bg-emerald', 'text-white'];
    }
}
