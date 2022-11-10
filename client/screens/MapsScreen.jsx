import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { AntDesign, Feather } from '@expo/vector-icons'

export default function MapsScreen() {
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)

  // Banska Bystrica
  // const [origin, setOrigin] = useState({
  //   latitude: 48.7384028,
  //   longitude: 19.1573494,
  // })

  useEffect(() => {
    // getLocationWithPermission()
  }, [])

  async function getLocationWithPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      alert('Permission denied')
      return
    }
    let location = await Location.getCurrentPositionAsync({})
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }
    console.log('[current location]', current)

    setOrigin(current)
    setDestination(current)
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={
          origin
            ? {
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.2,
                longitudeDelta: 0.1,
              }
            : null
        }
      >
        {destination && (
          <Marker
            draggable
            onDragEnd={direction => setDestination(direction.nativeEvent.coordinate)}
            coordinate={destination}
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.floatingButton1} onPress={() => getLocationWithPermission()}>
        {!destination ? (
          <AntDesign name="plus" size={24} color="#fff" />
        ) : (
          <Feather name="map-pin" size={24} color={'#fff'} />
        )}
      </TouchableOpacity>
      {destination && (
        <>
          <TouchableOpacity style={styles.floatingButton2} onPress={() => setDestination(null)}>
            <AntDesign name="minus" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.coordinates}>
            <Text style={{ fontSize: 16, color: '#fff' }}>lat: {destination.latitude}</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>lng: {destination.longitude}</Text>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  floatingButton1: {
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
  floatingButton2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
    position: 'absolute',
    bottom: 100,
    right: 16,
  },
  coordinates: {
    backgroundColor: '#22222280',
    padding: 8,
    position: 'absolute',
    left: 16,
    bottom: 24,
  },
})
