import { ApolloClient, InMemoryCache } from '@apollo/client'

const URI = 'https://195a-87-197-106-202.eu.ngrok.io'

export const apolloClient = new ApolloClient({
  uri: `${URI}/graphql`,
  cache: new InMemoryCache(),
})
