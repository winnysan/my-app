import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login</Text>

      <View style={{ flexDirection: 'row' }}>
        <Text>or</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text> register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
