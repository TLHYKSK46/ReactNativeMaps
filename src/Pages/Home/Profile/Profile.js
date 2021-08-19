import React from "react";
import { SafeAreaView, Text, Button, View ,Image} from "react-native";
import auth from '@react-native-firebase/auth';

import styles from "./Profile.style"

export default function PinList() {

  const email=auth().currentUser.email;

  return (
    <SafeAreaView style={styles.container}>
       <View>
         <Image style={styles.image} source={{uri:"https://hardiagedcare.com.au/wp-content/uploads/2019/02/default-avatar-profile-icon-vector-18942381.jpg"}}  />
      <Text style={styles.email}>{email}</Text>
    </View>
    </SafeAreaView>
   
  );
}
