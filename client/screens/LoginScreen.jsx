import { useContext, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { AuthContext } from '../context/AuthProvider'

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('marek')
  const [password, setPassword] = useState('password')

  const { login } = useContext(AuthContext)

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="name"
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          placeholderTextColor="gray"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => login(name, password)}>
        <Text style={{ color: '#fff' }}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row' }}>
        <Text>or</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text> register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'white',
    width: 200,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#222',
    width: 200,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
})
