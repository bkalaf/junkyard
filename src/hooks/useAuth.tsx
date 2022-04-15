import { useReactiveVar } from '@apollo/client';
import { useCallback } from 'react';
import { app, currentUser } from '../state';
import * as Realm from 'realm-web';

export function useAuth() {
    const $app = useReactiveVar(app);
    const $currentUser = useReactiveVar(currentUser);

    const logOut = useCallback(async () => {
        if ($currentUser) {
            $currentUser.logOut();
            currentUser(null);
        }
    }, [$currentUser]);
    const logIn = useCallback(async ({ email, password }: {email: string, password: string}) => {
        try {
            const user = await $app.logIn(Realm.Credentials.emailPassword(email, password));
            currentUser(user);
        } catch (error) {
            console.error((error as Error).message);
            throw error;
        }
    }, [$app]);
    const register = useCallback(async ({ email, password }: {email: string, password: string}) => {
        try {
            await $app.emailPasswordAuth.registerUser(email, password);
            return logIn({email, password});
        } catch (error) {
            console.error((error as Error).message);            
        }
    }, [$app.emailPasswordAuth, logIn]);
    return {
        app: $app,
        accessToken: $currentUser?.accessToken,
        email: $currentUser?.profile.email,
        isAuthenticated: $currentUser != null,
        logOut,
        logIn,
        register
    };
}