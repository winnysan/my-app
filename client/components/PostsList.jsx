import { useQuery } from '@apollo/client'
import { useEffect, useRef } from 'react'
import { View, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import { GET_POSTS } from '../graphql/queries'
import PostItem from './PostItem'

export default function PostsList({ route }) {
  const flatlistRef = useRef()

  const { data, loading, refetch } = useQuery(GET_POSTS, {
    fetchPolicy: 'network-only',
  })

  useEffect(() => {
    if (route.params?.newPostAdded) {
      refetch()
      flatlistRef.current.scrollToOffset({ offset: 0 })
    }
  }, [route.params?.newPostAdded])

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          ref={flatlistRef}
          data={data.posts}
          renderItem={props => <PostItem {...props} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#e5e7eb' }} />
          )}
          onRefresh={() => refetch()}
          refreshing={false}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
