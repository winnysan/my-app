import 'react-native-gesture-handler'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from './context/AuthProvider'
import { apolloClient } from './graphql/client'
import Root from './Root'

export default function App() {
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <Root />
      </ApolloProvider>
    </AuthProvider>
  )
}
