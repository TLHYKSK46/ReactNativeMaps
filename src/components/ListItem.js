import React from 'react';
import {SafeAreaView, Text, Image, View, StyleSheet} from 'react-native';

export default function ListItem({marker}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{marker.title}</Text>
      {/* <Text>{marker.id}</Text> */}
      <View style={styles.location}>
        <Text style={styles.text}>latitude:{marker.latitude}</Text>
        <Text style={styles.text}>longitude:{marker.longitude}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fb5b5a',
    margin: 5,
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    padding: 5,
  },
  text: {
    color: '#fff',
    margin: 5,
  },
  location: {
    flexDirection: 'row',
  },
});
