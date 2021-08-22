import React,{useState} from "react";
import { SafeAreaView, Text, Button, View ,Image} from "react-native";
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import styles from "./Profile.style"

export default function PinList() {
  const [contentList, setContentList]=React.useState([]);
console.log(auth().currentUser.uid)
  const email=auth().currentUser.email;
  React.useEffect(() => {
    database()
      .ref('Users/')
      .on('value', snapshot => {
        const contentData = snapshot.val();
       const parsedData= parseData(contentData);
       if(parsedData.email===email) {
          setContentList(parsedData);

       }
        //console.log(parsedData)
      });
  },[]);

  return (
    <SafeAreaView style={styles.container}>
       <View>
         <Image style={styles.image} source={{uri:"https://hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg"}}  />
      <Text style={styles.email}>{email}</Text>

    </View>
    </SafeAreaView>
   
  );
}
