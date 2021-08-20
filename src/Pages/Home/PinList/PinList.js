import React, {useState} from 'react';
import {SafeAreaView, Text, Button, View, StyleSheet,FlatList} from 'react-native';
import database from '@react-native-firebase/database';
import parseData from '../../../Utilities/parseData';
import ListItem from '../../../components/ListItem';
import auth from '@react-native-firebase/auth';
import styles from './PinList.style'

export default function PinList() {
  const [contentList, setContentList]=React.useState([]);

  
  React.useEffect(() => {
    database()
      .ref('Markers/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
       const parsedData= parseData(contentData);
        setContentList(parsedData);
        console.log(parsedData)
      });
  },[]);
  const renderContent=({item})=><ListItem  marker={item} />
  return(
    <SafeAreaView style={styles.container}>
        <FlatList
        data={contentList}
        renderItem={renderContent}
        />
    </SafeAreaView>
  )
}

