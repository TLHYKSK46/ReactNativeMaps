import React, {useState} from 'react';
import {SafeAreaView, Text, Button, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';
import styles from './Maps.style';
import Dialog from 'react-native-dialog';

export default function Maps(props) {
  const [coord, setCoord] = useState();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');

  const initialRegion = {
    latitude: 39.92159743251795,
    longitude: 32.85485230386257,
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
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  function addMarker() {
    // const {latitude, longitude} = event.nativeEvent.coordinate;
    // console.log(latitude);
    const location = {
      email: 'test@example.com',
      title: title,
      latitude: coord.latitude,
      longitude: coord.longitude,
    };
    console.log(location);
    database().ref('Markers/').push(location);
    setVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View >
        <Dialog.Container visible={visible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Input label="Pin Name"  onChangeText={t => setTitle(t)}>
            {title}
          </Dialog.Input>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Ok" onPress={addMarker} />
        </Dialog.Container>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={event => setCoord(event.nativeEvent.coordinate),showDialog}>
        {coord !== undefined && <Marker coordinate={coord} />}
      </MapView>
    </SafeAreaView>
  );
}
