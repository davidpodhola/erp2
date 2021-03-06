/**
 * unfortunately this file needs to reside under the mobile client
 * as the react-native packager (metro) is not able to work with
 * files outside of the mobile root
 */

import fetch from 'cross-fetch';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const uri = process.env.EXPO_API_ADDRESS || process.env.NX_API_ADDRESS;

const httpLink = createHttpLink({
  uri,
  fetch,
});

console.log(process.env);
console.log(`*** httpLink uri`, uri);

interface Auth {
  token: string;
}

export const auth: Auth = {} as any;

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = auth.token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
