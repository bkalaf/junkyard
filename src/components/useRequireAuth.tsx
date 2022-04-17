import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useOverlay } from '../hooks/useOverlay';
import { LogIn } from './LogIn';


export function useRequireAuth() {
    const { isAuthenticated } = useAuth();
    const [_, { appendOverlay, popOverlay }] = useOverlay();
    useEffect(() => {
        if (!isAuthenticated) {
            appendOverlay(<LogIn onSuccess={popOverlay} />);
        }
    }, [appendOverlay, isAuthenticated, popOverlay]);
}
