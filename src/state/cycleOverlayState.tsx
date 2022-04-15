import { OverlayState } from "./OverlayState";

export function cycleOverlayState(current: OverlayState) {
    switch (current) {
        case 'hidden':
            return 'showing';
        case 'hiding':
            return 'hidden';
        case 'shown':
            return 'hiding';
        case 'showing':
            return 'shown';
    }
}
