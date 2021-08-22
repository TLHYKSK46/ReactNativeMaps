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
  const [data, setData] = useState();
  const [pinnedLocations, setPinnedLocations] = useState([]);
  const [newMarkerCoordinates, setNewMarkerCoordinates] = useState();
  let markers1 = [];
  // const {latitude="",longitude="",latitudeDelta="",longitudeDelta=""}=props.route.params;
  // const myLocation ={
  //   latitude: latitude,
  //   longitude:longitude,
  //   latitudeDelta: latitudeDelta,
  //   longitudeDelta: longitudeDelta,
  // };
  // setCoord2(props.route.params.latitude)
  const initialRegion = {
    latitude: props.route.params.latitude ?? 39.92159743251795,
    longitude: props.route.params.longitude ?? 32.85485230386257,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const map1 = new Map();

  // Geolocation.watchPosition(
  //   position => {
  //     setCoord(position.coords);
  //   },
  //   error => {
  //     console.log(error);
  //   },
  // );
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
    } else {
      alert('Please! enter title');
    }
  }

  // React.useEffect(() => {
  //   console.log(coord);
  // }, [coord]);

  React.useEffect(() => {
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
    // database()
    //   .ref('Markers/')
    //   .on('value', snapshot => {
    //     const contentData = snapshot.val();
    //     const parsedData = parseData(contentData);
    //     //setPinnedLocations(contentData);
    //     //setData(parsedData);
    //     // parsedData.map(item => {
    //     //   console.log(item);
    //     //   setData({
    //     //     id: item.id,
    //     //     latitude: item.latitude,
    //     //     longitude: item.longitude,
    //     //   });
    //     // });
    //     console.log(parsedData);
    //     console.log('MARKERS FROMAPI :');
    //     console.log(pinnedLocations);
    //     //console.log(data)
    //   });

    // setPinnedLocations([
    //   {id: 2, latitude: 50, longitude: 50},
    //   {id: 3, latitude: 40, longitude: 40},
    // ]);
  }, []);
  const renderUseMarker = () => {
    // const konum=  data.map((item)=>{ return{latitude:item.latitude,longitude: item.longitude}})
    //return (<Marker  coordinate={konum} />)
    // return data.map((item)=>{
    //   //console.log(item.latitude)
    //   return (<Marker key={item.id} coordinate={item} />)
    // })
    console.log(data);
    return markers.map(({id, latitude, longitude}) => {
      // const lot=map1.set(latitude,longitude)
      return (
        <Marker
          key={id}
          coordinate={{latitude: latitude, longitude: longitude}}
        />
      );
    });
  };

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

        {/* {markers && renderUseMarker()} */}

        {/* <Marker coordinate={data} /> */}
      </MapView>
    </SafeAreaView>
  );
}
