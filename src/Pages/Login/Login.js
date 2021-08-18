import React from "react";
import { SafeAreaView,View, Text, Button, TextInput } from "react-native";
import styles from "./Login.style";
import Maps from "../Home/Maps/Maps";
import PinList from "../Home/PinList/PinList.js";
// import auth from "@react-native-firebase/auth";

export default function Login(props) {
  const [text, onChangeText] = React.useState("");
  const [number, onChangeNumber] = React.useState(null);

  function onRegister() {
    props.navigation.navigate("Register");
  }
  function onHome() {
    navigation.navigate("Home");
  }
  const login = () => {
   props.navigation.navigate('Home');
    // auth()
    //   .signInWithEmailAndPassword("test@test.com", "test**")
    //   .then(() => {
    //     alert("User account created & signed in!");
    //   })
    //   .catch((error) => {ß
    //     if (error.code === "auth/email-already-in-use") {
    //       console.log("That email address is already in use!");
    //     }

    //     if (error.code === "auth/invalid-email") {
    //       console.log("That email address is invalid!");
    //     }

    //     console.error(error);
    //   });
  };

  return (
    <SafeAreaView style={styles.container}>
    <View >
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Password"
      />
      <Button title="Sign In" onPress={login} style={styles.button} />
       <Button title="Register" onPress={onRegister} style={styles.button} />
    </View> 
    </SafeAreaView>
  );
}
