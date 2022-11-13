import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { useState } from 'react'
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import { ADD_AVATAR } from '../graphql/mutations'
import { useMutation } from '@apollo/client'

export default function AddAvatar() {
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [avatarBase64, setAvatarBase64] = useState(null)

  const [addAvatarMutation] = useMutation(ADD_AVATAR, {
    variables: { avatar: avatarBase64 },
  })

  function handleSubmit() {
    setLoading(true)
    addAvatarMutation()
      .then(result => {
        setLoading(false)
        console.log('[addAvatar] success', result)
      })
      .catch(error => {
        setLoading(false)
        console.error('[addAvatar]', error)
      })
  }

  async function pickAvatar() {
    setLoading(true)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })
    console.log('[pickAvatar]', result)

    if (!result.canceled) {
      let manipulatedImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 400, height: 400 } }],
        { base64: true, compress: 0.8 }
      )
      setAvatar(manipulatedImage.uri)
      setAvatarBase64(manipulatedImage.base64)
    }
    setLoading(false)
  }

  async function takeAvatar() {
    setLoading(true)
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    console.log('[takeAvatar]', result)
    setLoading(false)
  }

  return (
    <View>
      <Text>Add Image</Text>
      <Image source={{ uri: avatar }} style={{ width: 200, height: 200 }} />
      {loading ? (
        <View>
          <ActivityIndicator size="large" color="gray" />
        </View>
      ) : (
        <View>
          <TouchableOpacity onPress={() => pickAvatar()}>
            <Text>Pick avatar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => takeAvatar()}>
            <Text>Take avatar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleSubmit()}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}
