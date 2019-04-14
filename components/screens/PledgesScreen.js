import React from 'react';
import {
  Text, 
  StyleSheet,
  View
 } from 'react-native';


export default class PledgesScreen extends React.Component {
  static navigationOptions = {
    title: 'Pledges',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the Pledges Made screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});
