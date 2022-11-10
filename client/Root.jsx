import * as SecureStore from 'expo-secure-store'
import { useContext, useEffect } from 'react'
import { AuthContext } from './context/AuthProvider'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { AntDesign, Feather } from '@expo/vector-icons'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import NewPostScreen from './screens/NewPostScreen'
import SettingsScreen from './screens/SettingsScreen'
import { useSubscription } from '@apollo/client'
import { POST_ADDED_SUBSCRIPTION } from './graphql/subscriptions'
import { Context } from './context/ContextProvider'
import MapsScreen from './screens/MapsScreen'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

function HomeScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, headerBackTitleVisible: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="NewPostScreen"
        component={NewPostScreen}
        options={{ headerShown: true, headerTitle: '' }}
      />
    </Stack.Navigator>
  )
}

export default function Root() {
  const { user, setUser } = useContext(AuthContext)
  const { badge, setBadge } = useContext(Context)

  useEffect(() => {
    SecureStore.getItemAsync('user')
      .then(storeUser => {
        if (storeUser) {
          setUser(JSON.parse(storeUser).user)
        }
      })
      .catch(error => console.error(error))
  }, [])

  useSubscription(POST_ADDED_SUBSCRIPTION, {
    onData: result => {
      console.log('[POST_ADDED_SUBSCRIPTION]', result.data?.data.post)
      setBadge(true)
    },
  })

  return (
    <>
      {user ? (
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
              name="Home"
              component={HomeScreenStack}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="home" size={size} color={color} />
                ),
                tabBarBadge: badge ? '+' : null,
              }}
            />
            <Tab.Screen
              name="Maps"
              component={MapsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Feather name="map-pin" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="setting" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false, headerBackTitleVisible: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: true, headerTitle: '' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  )
}
