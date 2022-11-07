import { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthProvider'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Text, TouchableOpacity, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import * as SecureStore from 'expo-secure-store'
import Posts from './components/Posts'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Posts />
    </View>
  )
}

function Settings() {
  const { logout } = useContext(AuthContext)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => logout()}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default function Root() {
  const { user, setUser } = useContext(AuthContext)

  useEffect(() => {
    SecureStore.getItemAsync('user')
      .then(storeUser => {
        if (storeUser) {
          setUser(JSON.parse(storeUser).user)
        }
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      {user ? (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />,
              }}
            />
            <Tab.Screen
              name="Settings"
              component={Settings}
              options={{
                tabBarIcon: ({ color, size }) => <AntDesign name="setting" size={size} color={color} />,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}
