import React, { useState } from 'react'
import { ActivityIndicator, Button, FlatList, Image, useWindowDimensions, View } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

export default function ImagePickerMultiple() {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { width } = useWindowDimensions()

  async function pickImages() {
    // setIsLoading(true)
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsMultipleSelection: true,
    //   allowsEditing: false,
    //   selectionLimit: 5,
    //   aspect: [4, 3],
    //   quality: 1,
    // })
    // setIsLoading(false)
    // console.log(result)
    // if (!result.cancelled) {
    //   setImages(result.uri ? [result.uri] : result.selected)
    // }
  }

  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <Image source={{ uri: item.uri }} style={{ width: width, height: 250 }} />
      )}
      keyExtractor={item => item.uri}
      contentContainerStyle={{ marginVertical: 50, paddingBottom: 100 }}
      ListHeaderComponent={
        isLoading ? (
          <View>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ) : (
          <View>
            <Button title="Pick images" onPress={() => pickImages()} />
          </View>
        )
      }
    />
  )
}
