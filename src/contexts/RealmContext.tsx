import { ApolloClient, InMemoryCache, ReactiveVar } from '@apollo/client';
import { createContext } from 'react';
import * as Realm from 'realm-web';

const appID = 'jitt-mntcv';
export type IRealmContext = {
    app: Realm.App;
    currentUser: ReactiveVar<Realm.User | null>;
    email: ReactiveVar<string | null>;
    accessToken: ReactiveVar<string | null>;
    client: ApolloClient<InMemoryCache>;
    logIn: (email: string, password: string) => Promise<void>;
    logOut: () => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
}

export const RealmContext = createContext<IRealmContext | null>(null);

export function useProvideRealmContext() {
    const app = new Realm.App(appID);
}