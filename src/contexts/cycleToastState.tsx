import { ToastState } from "./ToastState";

export function cycleToastState(current: ToastState) {
    switch (current) {
        case 'animate-in':
            return 'waiting';
        case 'animate-out':
            return 'stale';
        case 'stale':
            return 'stale';
        case 'waiting':
            return 'animate-out';
    }
}
