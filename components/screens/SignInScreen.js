import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage
} from 'react-native';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _signInAsync = async () => {
      try {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Main');
      } catch (error) {
          console.warn('Async Storage error', error);
      }
    
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to the Sign-in Screen!</Text>
        <Button title="Sign in!" onPress={this._signInAsync} />
        <Button title="Sign up!" onPress={ () => this.props.navigation.navigate('SignUp')} />
        <Button title="Forgot Password" onPress={ () => this.props.navigation.navigate('ForgotPassword')} />
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