import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://rexus.williamenos.site/',
});

 export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});


