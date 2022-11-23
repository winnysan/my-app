import { useContext } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { styles } from '../assets/styles'
import AddAvatar from '../components/AddAvatar'
import { AuthContext } from '../context/AuthProvider'

export default function SettingsScreen() {
  const { logout } = useContext(AuthContext)

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 40, backgroundColor: '#fff' }}>
      <View>
        <Text style={{ fontSize: 32, marginBottom: 40, paddingHorizontal: 20 }}>Profile</Text>
      </View>

      <AddAvatar />

      <View style={{ marginVertical: 40, paddingHorizontal: 20 }}>
        <TouchableOpacity style={styles.buttonDark} onPress={() => logout()}>
          <Text style={styles.buttonDarkText}>Logout in Dark</Text>
        </TouchableOpacity>
        <View style={{ height: 20 }} />
        <TouchableOpacity style={styles.buttonLight} onPress={() => logout()}>
          <Text style={styles.buttonLightText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
