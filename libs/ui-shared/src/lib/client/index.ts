import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'http://192.168.13.193:3333/graphql',
  cache: new InMemoryCache(),
});
