import * as SecureStore from 'expo-secure-store'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

export const URI = 'https://1b60-87-197-106-202.eu.ngrok.io'

const httpLink = createHttpLink({
  uri: `${URI}/graphql`,
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

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
