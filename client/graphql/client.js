import * as SecureStore from 'expo-secure-store'
import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient as createWsClient } from 'graphql-ws'
import { setContext } from '@apollo/client/link/context'
import { Kind } from 'graphql'

export const URI = 'b209-2a01-c846-8c2-6100-e43d-977b-bed2-2e63.eu.ngrok.io'

const httpLink = createHttpLink({
  uri: `https://${URI}/graphql`,
})

const authLink = setContext(async (_, { headers }) => {
  const result = await SecureStore.getItemAsync('user')
  let token = null
  if (result) {
    token = JSON.parse(result).token
  }
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const wsLink = new GraphQLWsLink(
  createWsClient({
    url: `wss://${URI}/graphql`,
  })
)

function isSubscription({ query }) {
  const definition = getMainDefinition(query)
  return definition.kind === Kind.OPERATION_DEFINITION && definition.operation === 'subscription'
}

export const apolloClient = new ApolloClient({
  link: split(isSubscription, wsLink, authLink.concat(httpLink)),
  cache: new InMemoryCache(),
})
