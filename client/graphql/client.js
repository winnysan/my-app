import { ApolloClient, InMemoryCache } from '@apollo/client'

export const URI = 'https://af36-2a01-c846-8c2-6100-b045-3fc2-2084-63f9.eu.ngrok.io'

export const apolloClient = new ApolloClient({
  uri: `${URI}/graphql`,
  cache: new InMemoryCache(),
})
