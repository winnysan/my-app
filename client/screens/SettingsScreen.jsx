import { useContext } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AddAvatar from '../components/AddAvatar'
import { AuthContext } from '../context/AuthProvider'

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AddAvatar />

      <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
