import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
     flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  buttonContainer:{
    width:"100%",
    flexDirection:'row',
  },
  buttonText:{
    color: "#ffffff",
  },
  button: {
    //width:"80%",
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#000',
    width:"45%",

  },

  input: {
    borderWidth: 1,
    margin: 10,
    borderColor: '#000',
    padding: 10,
    borderRadius: 50,
  },
});
