import React, {useState} from 'react';
import {SafeAreaView, Text, Button, View, StyleSheet,FlatList} from 'react-native';
import database from '@react-native-firebase/database';
import parseData from '../../../Utilities/parseData';
import ListItem from '../../../components/ListItem';

export default function PinList() {
  const [contentList, setContentList]=React.useState([]);

  
  React.useEffect(() => {
    database()
      .ref('Markers/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
        parseData(contentData);
        setContentList(parseData);
      });
  },[]);
  const renderContent=({item})=>{
    <View>
         <Text>{item.title}</Text>
         <Text>{item.latitude}</Text>
         <Text>{item.longitude}</Text>
        </View>
  }//<ListItem  item={item} />
  return(
    <SafeAreaView style={styles.container}>
        <FlatList
        data={contentList}
        renderItem={renderContent}
        />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
