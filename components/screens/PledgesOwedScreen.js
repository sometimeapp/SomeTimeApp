import React from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';

export default class PledgesOwedScreen extends React.Component {
  static navigationOptions = {
    title: 'Owed',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the Pledges Owed screen</Text>
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
