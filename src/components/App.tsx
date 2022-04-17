import {
    ApolloClient,
    ApolloProvider,
    gql,
    HttpLink,
    InMemoryCache,
    makeVar,
    Reference,
    useReactiveVar
} from '@apollo/client';
import { useEffect, useMemo } from 'react';
import { HashRouter } from 'react-router-dom';
import { currentUser } from '../state';
import { MainWindow } from './MainWindow';
import './../assets/css/app.css';
import { useAuth } from '../hooks/useAuth';

const graphqlUri = `https://realm.mongodb.com/api/client/v2.0/app/jitt-mntcv/graphql`;

async function getAccessToken() {
    const user = currentUser();
    return user?.accessToken;
}
const cacheVar = new InMemoryCache({
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
                    read(existing, { readField, toReference, cache }) {
                        const facility = cache.readFragment<{ name: string }>({
                            id: (readField('facility') as Reference).__ref,
                            fragment: gql`
                                fragment FacilitySingle on Facility {
                                    name @client
                                }
                            `
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
                    read(existing, { variables, readField, toReference, cache }) {
                        const selfStorage: any = (readField({ fieldName: 'selfStorage' }) as Reference).__ref;
                        console.log('selfStorage', selfStorage);
                        const name: any = cache.readFragment({
                            id: selfStorage,
                            fragment: gql`
                                fragment SelfStorageSingle on SelfStorage {
                                    _id
                                    name
                                }
                            `
                        });
                        console.log(`name`, name);
                        const address: any = readField({ fieldName: 'address' });
                        return [
                            name.name,
                            [address.city, address.state].join(', '),
                            address.street.split(' ').slice(1).join(' ')
                        ].join(' - ');
                    }
                },
                label: {
                    read(_, { readField, cache }) {
                        const selfStorage: any = (readField({ fieldName: 'selfStorage' }) as Reference).__ref;
                        const name: any = cache.readFragment({
                            id: selfStorage,
                            fragment: gql`
                                fragment SelfStorageSingle on SelfStorage {
                                    _id
                                    name
                                }
                            `
                        });
                        const address: any = readField({ fieldName: 'address' });
                        const result = [
                            name.name,
                            [address.city, address.state].join(', '),
                            address.street.split(' ').slice(1).join(' ')
                        ].join(' - ');
                        return result;
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
        }
    }
});
const client = new ApolloClient({
    link: new HttpLink({
        uri: graphqlUri,
        fetch: async (uri, options) => {
            const accessToken = await getAccessToken();
            ((options as any).headers as any).Authorization = `Bearer ${accessToken}`;
            return fetch(uri, options);
        }
    }),
    cache: cacheVar
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
