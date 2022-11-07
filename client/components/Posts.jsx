import { useQuery } from '@apollo/client'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { GET_POSTS } from '../graphql/queries'

export default function Posts() {
  const { data, loading } = useQuery(GET_POSTS, {
    fetchPolicy: 'network-only',
  })

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.body}</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList data={data.posts} renderItem={renderItem} keyExtractor={(item) => item.id} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
