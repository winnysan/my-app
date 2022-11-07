import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './graphql/client'
import Root from './Root'

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <Root />
    </ApolloProvider>
  )
}
