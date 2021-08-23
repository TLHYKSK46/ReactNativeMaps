import React, {useState} from 'react';
import {SafeAreaView, Text, Button, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
//import Geolocation from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';
import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';
import styles from './Maps.style';
import Dialog from 'react-native-dialog';
import auth from '@react-native-firebase/auth';
import parseData from '../../../Utilities/parseData';

export default function Maps(props) {
  const [coord, setCoord] = useState();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [pinnedLocations, setPinnedLocations] = useState([]);
  const [newMarkerCoordinates, setNewMarkerCoordinates] = useState();
  // const {latitude,longitude,latitudeDelta,longitudeDelta}=props.route.params;
  const initialRegion = {
    latitude:  props?.route?.params?.latitude ?? 39.92159743251795,
    longitude:  props?.route?.params?.longitude ?? 32.85485230386257,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  // Geolocation.getCurrentPosition(
  //   c =>
  //     setCoord({
  //       latitude: c.coords.latitude,
  //       longitude: c.coords.longitude,
  //     }),
  //   error => console.log(error),
  //   {
  //     enableHighAccuracy: true,
  //   },
  // );
  const openMarkerDialog = (coordinates) => {
    console.log(coordinates);
    setNewMarkerCoordinates(coordinates);
    console.log(coord);
    showDialog();
  }
  const showDialog = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  function addMarker() {
    // const {latitude, longitude} = event.nativeEvent.coordinate;
    // console.log(latitude);
    if (title != '') {
      const location = {
        email: auth().currentUser.email,
        title: title,
        latitude: newMarkerCoordinates.latitude,
        longitude: newMarkerCoordinates.longitude,
      };
      database().ref('Markers/').push(location);
      setVisible(false);

      //rest operator
      setPinnedLocations([...pinnedLocations, newMarkerCoordinates]);
    } else {
      alert('Please! enter title');
    }
  }
  React.useEffect(() => {
    console.log('LAT FROM PROPS: ' + props?.route?.params?.latitude);
    database()
      .ref('/Markers')
      .once('value')
      .then(snapshot => {
        const locations = [];
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val();
          console.log(childData);
          locations.push(childData);
      });
      console.log('loc:');
      console.log(locations);
      setPinnedLocations(locations);
      });
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Dialog.Container visible={visible}>
          <Dialog.Title>Please enter title</Dialog.Title>
          <Dialog.Input label="Pin Name" onChangeText={t => setTitle(t)}>
            {title}
          </Dialog.Input>
          <Dialog.Button label="Ok" onPress={addMarker} />
          <Dialog.Button label="Cancel" onPress={handleCancel} />
        </Dialog.Container>
      </View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={initialRegion}
        onPress={(event => openMarkerDialog(event.nativeEvent.coordinate))}>
        {/* {coord !== undefined && <Marker coordinate={coord} />} */}
        {pinnedLocations &&
          pinnedLocations?.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
            />
          ))}
      </MapView>
    </SafeAreaView>
  );
}
