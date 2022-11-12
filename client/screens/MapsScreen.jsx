import * as Location from 'expo-location'
import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Callout, Marker } from 'react-native-maps'
import { AntDesign, Feather } from '@expo/vector-icons'

export default function MapsScreen() {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false)
  const [origin, setOrigin] = useState(null)
  const [destination, setDestination] = useState(null)

  useEffect(() => {
    checkIfLocationEnabled()
    if (!destination) {
      getCurrentLocation()
    }
  }, [])

  async function checkIfLocationEnabled() {
    let enabled = await Location.hasServicesEnabledAsync()
    console.info('[hasServicesEnabledAsync]', enabled)
    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue.',
        [{ text: 'OK' }],
        { cancelable: false }
      )
    } else {
      setLocationServiceEnabled(enabled)
    }
  }

  async function getCurrentLocation(coordinates = null) {
    let { status } = await Location.requestForegroundPermissionsAsync()
    console.info('[requestForegroundPermissionsAsync]', status)

    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      )
      return
    }

    if (!coordinates) {
      let { coords } = await Location.getCurrentPositionAsync({})
      coordinates = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      }
    }

    let [address] = await Location.reverseGeocodeAsync(coordinates)
    const destination = { ...coordinates, ...address }
    console.log('[destination]', destination)

    setOrigin(destination)
    setDestination(destination)
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
            onDragEnd={direction => getCurrentLocation(direction.nativeEvent.coordinate)}
            coordinate={destination}
            image={require('../assets/marker.png')}
            title="hold and drag to another location"
          >
            <Callout tooltip>
              <View style={{ backgroundColor: '#22222280', padding: 8 }}>
                <Text style={{ color: '#fff' }}>hold and drag to another location</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>

      {locationServiceEnabled ? (
        <>
          <TouchableOpacity style={styles.floatingButton1} onPress={() => getCurrentLocation()}>
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
                <Text style={{ fontSize: 16, color: '#fff' }}>city: {destination.city}</Text>
                <Text style={{ fontSize: 16, color: '#fff' }}>name: {destination.name}</Text>
                <Text style={{ fontSize: 16, color: '#fff' }}>lat: {destination.latitude}</Text>
                <Text style={{ fontSize: 16, color: '#fff' }}>lng: {destination.longitude}</Text>
              </View>
            </>
          )}
        </>
      ) : (
        <View style={styles.coordinates}>
          <Text style={{ fontSize: 16, color: '#fff' }}>Location Service not enabled</Text>
        </View>
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
