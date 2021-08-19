import React,{ useState } from 'react';
import {SafeAreaView, Text, Button, View} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import MapView,{PROVIDER_GOOGLE, Marker,LatLng} from 'react-native-maps';
import styles from './Maps.style';
export default function Maps(props) {
  const [coord, setCoord] = useState();
  const initialRegion = {
    latitude: 41.0391683,
    longitude: 28.9982707,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };
Geolocation.getCurrentPosition(
    (c) =>
      setCoord({
        latitude: c.coords.latitude,
        longitude: c.coords.longitude,
      }),
    (error) => console.log(error),
    {
      enableHighAccuracy: true,
    },
  );
  return (
    <SafeAreaView style={styles.container}>
      <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={initialRegion}>
      {coord !== undefined && <Marker coordinate={coord} />}
    </MapView>
    </SafeAreaView>
  );
}
