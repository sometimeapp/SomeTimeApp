import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class HomeScreen extends React.Component {
  state = {}

  static navigationOptions = {
    header: null,
  };

  render() {
    console.log("rendering the home screen!")
    return (
      <View style={styles.container}>
        <Text>Welcome to the Home screen</Text>
        <Button
          style={styles.button}
          title="Make Promise"
          onPress={() => this.props.navigation.navigate('QR')}
        />
        <Button
          style={styles.button}
          title="Receive"
          onPress={() => this.props.navigation.navigate('Receive')}
        />
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
  },
  button: {
    padding: 20
  }
});
