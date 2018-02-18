import React,{ Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Users} from './components';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Users</Text>
        <Users/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title:{
    fontSize:20,
  },
  container: {
    marginTop:30,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
});