import React, {useState} from 'react';
import {SafeAreaView, Text, Button, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';
import styles from './Maps.style';
export default function Maps(props) {
  const [coord, setCoord] = useState();

  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  Geolocation.getCurrentPosition(
    c =>
      setCoord({
        latitude: c.coords.latitude,
        longitude: c.coords.longitude,
      }),
    error => console.log(error),
    {
      enableHighAccuracy: true,
    },
  );

  function addMarker(event) {
    // const {latitude, longitude} = event.nativeEvent.coordinate;
    // console.log(latitude);
    

      const location = {
        email: 'test@example.com',
        title:title,
        latitude: event.nativeEvent.coordinate.latitude,
        longitude: event.nativeEvent.coordinate.longitude,
      };
      console.log(location);
      database().ref('Markers/').push(location);
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={event => addMarker(event)}>
        {coord !== undefined && <Marker coordinate={coord} />}

      </MapView>
    </SafeAreaView>
  );
}
