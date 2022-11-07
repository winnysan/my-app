import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function RegisterScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Register</Text>

      <View style={{ flexDirection: 'row' }}>
        <Text>or</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text> login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
