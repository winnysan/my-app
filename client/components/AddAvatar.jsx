import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { useRef, useState } from 'react'
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from 'react-native'
import { ADD_AVATAR } from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import { Feather } from '@expo/vector-icons'

export default function AddAvatar() {
  const [loading, setLoading] = useState(false)
  const [avatar, setAvatar] = useState(null)
  const [avatarBase64, setAvatarBase64] = useState(null)

  const [addAvatarMutation] = useMutation(ADD_AVATAR, {
    variables: { avatar: avatarBase64 },
  })

  function handleSubmit() {
    setLoading(true)
    if (!avatar && !avatarBase64) return
    addAvatarMutation()
      .then(result => {
        setLoading(false)
        console.info('[addAvatar] submit success', result.data?.addAvatar.id)
      })
      .catch(error => {
        setLoading(false)
        console.error('[addAvatar] submit error', error)
      })
  }

  async function manipulateImage(result) {
    let manipulatedImage = await ImageManipulator.manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 200, height: 200 } }],
      { base64: true, compress: 0.8 }
    )
    setAvatar(manipulatedImage.uri)
    setAvatarBase64(manipulatedImage.base64)
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

    if (!result.canceled) {
      manipulateImage(result)
      handleSubmit()
    }
    setLoading(false)
  }

  async function takeAvatar() {
    setLoading(true)
    let { status } = await ImagePicker.requestCameraPermissionsAsync()
    console.info('[requestCameraPermissionsAsync]', status)

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use camera service.',
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (!result.canceled) {
      manipulateImage(result)
      handleSubmit()
    }
    setLoading(false)
  }

  return (
    <>
      <View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={avatar ? { uri: avatar } : require('../assets/avatar.png')}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
        </View>
        {loading ? (
          <View style={{ marginVertical: 40 }}>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 20 }}>
            <TouchableOpacity onPress={() => pickAvatar()} style={{ padding: 15 }}>
              <Feather name="image" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => takeAvatar()} style={{ padding: 15 }}>
              <Feather name="camera" size={32} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </>
  )
}
