import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { CREATE_POST } from '../graphql/mutations'

export default function NewPostScreen({ navigation }) {
  const [body, setBody] = useState('Content of post...\nmultiline')
  const [loading, setLoading] = useState(false)

  const [mutate] = useMutation(CREATE_POST)

  async function handleSubmit() {
    setLoading(true)
    mutate({ variables: { body: body } })
      .then((result) => {
        setLoading(false)
        navigation.navigate('HomeScreen')
      })
      .catch((error) => {
        setLoading(false)
        console.error('[NewPost]', error)
      })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput style={styles.input} value={body} onChangeText={setBody} multiline />
      <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={loading}>
        {loading ? <ActivityIndicator size="small" /> : <Text style={{ color: '#fff' }}>Submit</Text>}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: 300,
    padding: 12,
    marginBottom: 16,
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
