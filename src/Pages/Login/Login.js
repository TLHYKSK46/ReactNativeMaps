import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import styles from './Login.style';
import auth from '@react-native-firebase/auth';
import {CommonActions} from '@react-navigation/native';

export default function Login(props) {
  const [email, onChangeEmail] = React.useState(null);
  const [password, onChangePassword] = React.useState(null);

  function onRegister() {
    props.navigation.navigate('Register');
  }
  const login = () => {
    auth()
    .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account  & signed in!');
        props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'Home'}],
          }),
        );
      })
      .catch(error => {
        alert('Please! email and password');
        // if(error.message ==="checkNotEmpty"){
        //   alert("Please! email and password")
        // }

        // if (error.code === "auth/email-already-in-use") {
        //   console.log("That email address is already in use!");
        // }

        // if (error.code === "auth/invalid-email") {
        //   console.log("That email address is invalid!");
        // }

        // console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
