import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, Reference, useReactiveVar } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import { currentUser } from '../state';
import { MainWindow } from './MainWindow';
import './../assets/css/app.css';
import { useAuth } from '../hooks/useAuth';
import { appendFile } from 'fs';

const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/jitt-mntcv/graphql`;

export function App() {
    const { accessToken, email, logIn } = useAuth();
    console.log('accessToken', accessToken);
    const client = useMemo(() => {
        return new ApolloClient({
            link: new HttpLink({
                uri: graphqlUri,
                fetch: async (uri, options) => {
                    console.log(options);
                    ((options as any).headers as any).Authorization = `Bearer ${accessToken}`;
                    return await fetch(uri, options);
                }
            }),
            cache: new InMemoryCache({
                typePolicies: {
                    SelfStorage: {
                        fields: {
                            label: {
                                read(_, { readField }) {
                                    return readField('name');
                                }
                            },
                            value: {
                                read(_, { readField }) {
                                    return readField('_id');
                                }
                            },
                            key: {
                                read(_, { readField }) {
                                    return readField('_id');
                                }
                            }
                        }
                    },
                    Facility: {
                        fields: {
                            name: {
                                read(existing, { variables, readField, toReference }) {
                                    const selfStorage: any = readField({ fieldName: 'selfStorage' });
                                    const address: any = readField({ fieldName: 'address' });
                                    return [
                                        selfStorage.name,
                                        [address.city, address.state].join(', '),
                                        address.street.split(' ').slice(1).join(' ')
                                    ].join(' - ');
                                }
                            },
                            label: {
                                read(_, { readField }) {
                                    return readField('name');
                                }
                            },
                            value: {
                                read(_, { readField }) {
                                    return readField('_id');
                                }
                            },
                            key: {
                                read(_, { readField }) {
                                    return readField('_id');
                                }
                            },
                            isSelected: {
                                read(_, { variables, readField }) {
                                    const selected: string[] = variables?.selected ?? [];
                                    const _id = readField({ fieldName: '_id' });
                                    return selected.includes(_id as string);
                                }
                            }
                        }
                    }
                }
            })
        });
    }, [accessToken]);
    return (
        <HashRouter>
            <ApolloProvider client={client}>
                <MainWindow />
            </ApolloProvider>
        </HashRouter>
    );
}
