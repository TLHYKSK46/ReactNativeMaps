import React from "react";
import { SafeAreaView, Text, Button, View ,Image} from "react-native";

export default function ListItem({item}) {

console.log(item);

return (
        <View>
         <Text>{item.title}</Text>
         <Text>{item.latitude}</Text>
         <Text>{item.longitude}</Text>
        </View>

  );
}
