import { useMutation } from '@apollo/client'
import { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import ImagePickerMultiple from '../components/ImagePickerMultiple'
import { CREATE_POST } from '../graphql/mutations'
import { GET_POSTS } from '../graphql/queries'

export default function NewPostScreen({ navigation }) {
  const [body, setBody] = useState(`[${Math.floor(Math.random() * 1000) + 1}] `)
  const [loading, setLoading] = useState(false)

  const [addPostMutation] = useMutation(CREATE_POST, {
    variables: { body: body },
    update(cache, { data: { createPost } }) {
      let data = cache.readQuery({ query: GET_POSTS })
      data = {
        ...data,
        posts: [...data.posts, createPost],
      }
      cache.writeQuery({ query: GET_POSTS, data })
    },
  })

  function handleSubmit() {
    setLoading(true)
    addPostMutation()
      .then(result => {
        setLoading(false)
        navigation.navigate('HomeScreen', {
          newPostAdded: result.data?.createPost,
        })
      })
      .catch(error => {
        setLoading(false)
        console.error('[NewPost]', error)
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput style={styles.input} value={body} onChangeText={setBody} multiline />
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text style={{ color: '#fff' }}>Submit</Text>
        )}
      </TouchableOpacity>
      <ImagePickerMultiple />
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: 200,
    padding: 12,
    marginVertical: 16,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#222',
    width: 200,
    height: 40,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
