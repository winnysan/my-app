import { useContext } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import AddAvatar from '../components/AddAvatar'
import { AuthContext } from '../context/AuthProvider'

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext)

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40 }}>
      <View>
        <Text style={{ fontSize: 32, marginBottom: 40, paddingHorizontal: 20 }}>Profile</Text>
      </View>

      <AddAvatar />

      <View style={{ marginVertical: 40, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => logout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
