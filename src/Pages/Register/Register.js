import React from 'react';
import {SafeAreaView, Text, Button, View,TextInput,TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './Register.style';
import database from '@react-native-firebase/database';

export default function Register(props) {
    const [email, onChangeEmail] = React.useState("");
    const [name, onChangeName] = React.useState("");

    const [password, onChangePassword] = React.useState(null);
  const Register = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = {
          email: email,
          adSoyad: name,
        };
        database().ref('Users/'+auth.uıd).push(user);
        alert('User account created & signed in!');

        props.navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Register</Text>
        <TextInput
        style={styles.input}
        onChangeText={onChangeName}
        value={name}
        placeholder="Name Surname"
      />
        <TextInput
        style={styles.input}
        onChangeText={onChangeEmail}
        value={email}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
      />

       <TouchableOpacity style={styles.button} onPress={Register}>
            <Text style={styles.buttonText} >Register</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
