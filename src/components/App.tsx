import { ApolloClient, ApolloProvider, gql, HttpLink, InMemoryCache, Reference, useReactiveVar } from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import { currentUser } from '../state';
import { MainWindow } from './MainWindow';
import './../assets/css/app.css';
import { useAuth } from '../hooks/useAuth';
import { appendFile } from 'fs';

const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/jitt-mntcv/graphql`;

async function getAccessToken() {
    const user = currentUser();
    return user?.accessToken;
}
const cacheVar = makeVar(new InMemoryCache({
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
                        read(existing, { variables, readField, toReference, cache }) {
                            const selfStorage: any = readField({ fieldName: 'selfStorage' });
                            console.log(`selfStorage`, selfStorage);
                            console.log(`toRef`, toReference(selfStorage));
                            console.log(`cache`, cache.readFragment({ id: selfStorage.ref, fragment: gql`
                            fragment SelfStorageSingle on SelfStorage {
                                _id
                                name
                            }`}));
                            const selfStorageObj: any = cache.readFragment({ id: selfStorage.__ref, fragment: gql`
                            fragment SelfStorageSingle on SelfStorage {
                                _id
                                name
                            }`});
                            const address: any = readField({ fieldName: 'address' });
                            return [
                                selfStorageObj.name,
                                [address.city, address.state].join(', '),
                                address.street.split(' ').slice(1).join(' ')
                            ].join(' - ');
                        }
                    },
                    RentalUnit: {
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
                            },
                            name: {
                                read(existing, {  readField, toReference, cache }) {
                                    const facility = cache.readFragment<{ name: string }>({
                                        id: (readField('facility') as Reference).__ref,
                                        fragment: gql`
                                        fragment FacilitySingle on Facility {
                                            name
                                        }`
                                    })?.name;
                                    const closeDate = readField({ fieldName: 'closeDate' });
                                    return [facility, closeDate].join(' - ');
                                }
                            }
                        }
                    },
                    Facility: {
                        fields: {
                            name: {
                                read(existing, { variables, readField, toReference }) {
                                    const selfStorage: any = toReference(readField({ fieldName: 'selfStorage' }) as Reference);
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
    }));
const client = new ApolloClient({
    link: new HttpLink({
        uri: graphqlUri,
        fetch: async (uri, options) => {
            const accessToken = await getAccessToken();
            ((options as any).headers as any).Authorization = `Bearer ${accessToken}`;
            return fetch(uri, options);
        }
    }),
    cache: cacheVar()
});
export function App() {
    const { accessToken, email, logIn } = useAuth();
    console.log('accessToken', accessToken);
    
    return (
        <HashRouter>
            <ApolloProvider client={client!}>
                <MainWindow />
            </ApolloProvider>
        </HashRouter>
    );
}
