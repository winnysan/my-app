import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text, View } from 'react-native'
import Posts from './screens/Posts'

const Tab = createBottomTabNavigator()

function HomeScreen() {
  return <Posts />
}

function Screen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Screen</Text>
    </View>
  )
}

export default function Root() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Screen" component={Screen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
