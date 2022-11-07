import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import Posts from '../components/Posts'

export default function HomeScreen({ navigation }) {
  function gotoNewPost() {
    navigation.navigate('NewPostScreen')
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Posts />
      <TouchableOpacity style={styles.floatingButton} onPress={() => gotoNewPost()}>
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
})
