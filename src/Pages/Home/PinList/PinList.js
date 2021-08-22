import React, {useState} from 'react';
import {SafeAreaView,FlatList,TouchableOpacity} from 'react-native';
import database from '@react-native-firebase/database';
import parseData from '../../../Utilities/parseData';
import ListItem from '../../../components/ListItem';
import auth from '@react-native-firebase/auth';
import styles from './PinList.style'

export default function PinList({navigation}) {
  const [contentList, setContentList]=React.useState([]);
function onPress(){
  navigation.navigate('Maps',{
    latitude:37.4219983,
    longitude: -122.084,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  
}
  
  React.useEffect(() => {
    database()
      .ref('Markers/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
       const parsedData= parseData(contentData);
        setContentList(parsedData);
        //console.log(parsedData)
      });
  },[]);
  const renderContent=({item})=>
  <TouchableOpacity onPress={onPress}> 
  <ListItem  marker={item}  />
  </TouchableOpacity>

  return(
    <SafeAreaView style={styles.container}>
        <FlatList
        data={contentList}
        renderItem={renderContent}
        />
    </SafeAreaView>
  )
}

