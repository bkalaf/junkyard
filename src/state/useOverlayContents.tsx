import { useReactiveVar } from '@apollo/client';
import { overlayContents } from './index';

export function useOverlayContents() {
    return useReactiveVar(overlayContents);
}
