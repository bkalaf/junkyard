import { createPortal } from 'react-dom';
import { FullscreenOverlay } from './FullscreenOverlay';


export function OverlayMount() {
    const el = document.getElementById('modal-root');
    return createPortal(<FullscreenOverlay />, el!);
}
