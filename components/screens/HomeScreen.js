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
    headerTitle: 'Home',
  };

  render() {
    console.log("rendering the home screen!")
    return (
      <View style={styles.container}>
        <Text>Welcome to the Home screen</Text>
        <View style={{ margin: 5 }}>
          <Button
            style={styles.button}
            title="Make Promise"
            onPress={() => this.props.navigation.navigate('QR')}
          />
          </View>
          <View style={{ margin: 5 }}>
          <Button
            style={styles.button}
            title="Receive"
            onPress={() => this.props.navigation.navigate('Receive')}
          />
        </View>
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
    backgroundColor: '#ffffff',
  }
});
