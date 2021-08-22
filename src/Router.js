import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
// import {createBottomTabNavigator} from '@react-navigation/material-bottom-tabs'

import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Maps from './Pages/Home/Maps/Maps';
import PinList from './Pages/Home/PinList/PinList';
import Profile from "./Pages/Home/Profile/Profile"
import ListItem from "./components/ListItem"
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
function  App() {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{title: "Login"}}/>
          <Stack.Screen name="Register" component={Register} options={{title: "Register"}} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="ListItem" component={ListItem} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
  );    
}
export default App;


export const Home = () => {
  return (

      <Tab.Navigator>
        <Tab.Screen name="Maps" component={Maps} options={{tabBarActiveTintColor:"#fb5b5a"}} />
        <Tab.Screen name="PinList" component={PinList} options={{title: "Locations",tabBarActiveTintColor:"#fb5b5a"}} />
        <Tab.Screen name="Profile" component={Profile}  options={{tabBarActiveTintColor:"#fb5b5a"}}/>
      </Tab.Navigator>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
