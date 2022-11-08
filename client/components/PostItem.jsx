import { StyleSheet, Text, View } from 'react-native'

export default function PostItem({ item: post }) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
        <Text style={{ fontSize: 12, color: 'gray' }}>author: {post.author.name}</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>author ID: {post.author.id}</Text>
      </View>
      <View>
        <Text style={{ fontSize: 12 }}>{post.body}</Text>
        <Text style={{ fontSize: 12, color: 'gray' }}>post ID: {post.id}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
})
