import React from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet,TouchableOpacity} from 'react-native';
import Maps from '../Pages/Home/Maps/Maps'
export default function ListItem(props) {
 
  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>{props.marker.title}</Text>
      {/* <Text>{marker.id}</Text> */}
      <View style={styles.location}>
        <Text style={styles.text}>latitude:{props.marker.latitude}</Text>
        <Text style={styles.text}>longitude:{props.marker.longitude}</Text>
      </View>
     
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fb5b5a',
    margin: 2,
    padding: 3,
    borderRadius: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    padding: 3,
  },
  text: {
    color: '#F5F5F5',
    marginLeft: 3,
  },
  location: {
    flexDirection: 'column',
  },
});
