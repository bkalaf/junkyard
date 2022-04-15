import { useWhyDidYou } from '../hooks/useWhyDidYou';
import { useToaster } from '../state/useToaster';

export function Toaster() {
    const toasts = useToaster();
    useWhyDidYou('Toaster', { toasts });
    return (
        <div className='absolute top-0 z-40 flex flex-col-reverse w-1/4 h-full space-y-2 bg-transparent pointer-events-none left-2/3'>
            {toasts}
        </div>
    );
}
