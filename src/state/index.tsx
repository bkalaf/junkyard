import { AlertCreator } from '../contexts/ToasterContext';
import * as Realm from 'realm-web';
import { gql, InMemoryCache, makeVar } from '@apollo/client';

export function ignore(...args: any[]) {
    return;
}
export const app = makeVar<Realm.App>(new Realm.App('jitt-mntcv'));
export const currentUser = makeVar<Realm.User | null>(null);
export const toasts = makeVar<JSX.Element[]>([]);
export const overlayContents = makeVar<JSX.Element[]>([]);


