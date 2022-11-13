import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { formatDistanceToNowStrict } from 'date-fns'
import locale from 'date-fns/locale/en-US'
import formatDistance from '../utilities/formatDistance'

export default function PostItem({ item: post }) {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image style={styles.avatar} source={require('../assets/avatar.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ fontSize: 12, color: 'gray' }}>author: {post.author.name}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>
            published:{' '}
            {formatDistanceToNowStrict(new Date(post.createdAt), {
              locale: { ...locale, formatDistance },
            })}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 16 }}>{post.body}</Text>
          <Text style={{ fontSize: 12, color: 'gray' }}>post ID: {post.id}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginTop: 8,
    marginRight: 16,
  },
})
