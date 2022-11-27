import { ApolloClient, InMemoryCache, createHttpLink, split, ApolloLink, gql } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient as createWsClient } from 'graphql-ws'
import { Kind } from 'graphql'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { createLighthouseSubscriptionLink } from '@thekonz/apollo-lighthouse-subscription-link'
import PusherLink from './pusherLink'

const httpLink = createHttpLink({
  uri: `http://localhost:8000/graphql`,
})

// const wsLink = new GraphQLWsLink(
//   createWsClient({
//     url: `ws://127.0.0.1:6001/app/app-key`,
//   })
// )

// function isSubscription({ query }) {
//   const definition = getMainDefinition(query)
//   return definition.kind === Kind.OPERATION_DEFINITION && definition.operation === 'subscription'
// }

// export const client = new ApolloClient({
//   link: split(isSubscription, wsLink, httpLink),
//   cache: new InMemoryCache(),
// })

const echoClient = new Echo({
  broadcaster: 'pusher',
  key: 'app-key',
  wsHost: 'localhost',
  wsPort: 6001,
  wssPort: 6001,
  // forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
  forceTLS: false,
  encrypted: true,
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
})

// const pusherLink = new PusherLink({
//   pusher: new Pusher('app-key', {
//     cluster: 'mt1',
//     authEndpoint: `http://localhost:8000/graphql/subscriptions/auth`,
//     auth: {
//       headers: {
//         authorization:
//           'Bearer eyJpdiI6ImNXaGRTOW5hK3BmSkpSVm5BR0hRTWc9PSIsInZhbHVlIjoiZGNXWG1YVFFPNFJmWE9ySjJDSmxodVpmUXhGazBTb0RlK3B5RDFYdGlwOUdTL0Y2RjJCTGFGdWtRSDFVTGJXZm8wREV1aXlsZjJacy8xVG1wd0MwSlFwY2k2VDErTWZJdEc3SXh0eFVlQWFYOXIzN3VhY21RRG9sNFhkc1pmcG0iLCJtYWMiOiI4ZGM4ODE3NTFmM2ZiMWM4ODRjMjgxMDc0NTA5ZDE1ZTlhYWVhM2I1MWI1NTkwNjBmMGYxMTJlZDZjMTdiZmExIiwidGFnIjoiIn0=',
//       },
//     },
//   }),
// })

export const client = new ApolloClient({
  link: ApolloLink.from([createLighthouseSubscriptionLink(echoClient), httpLink]),
  // link: ApolloLink.from([pusherLink, httpLink]),
  cache: new InMemoryCache(),
})
