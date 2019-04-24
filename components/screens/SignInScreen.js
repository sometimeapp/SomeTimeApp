import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth'

import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }

  _signInAsync = async () => {
    const { email, password } = this.state
    await Auth.signIn(email, password)
      .then(user => {
        this.setState({ user })
        this.props.navigation.navigate('AuthLoading')
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when signing in: ', err)
          Alert.alert('Error when signing in: ', err)
        } else {
          console.log('Error when signing in: ', err.message)
          Alert.alert('Error when signing in: ', err.message)
        }
      })
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Container style={styles.infoContainer}>
                <View style={styles.container}>
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='mail'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Email'
                      placeholderTextColor='#adb4bc'
                      keyboardType={'email-address'}
                      returnKeyType='next'
                      autoCapitalize='none'
                      autoCorrect={false}
                      onSubmitEditing={(event) => { this.refs.SecondInput._root.focus() }}
                      onChangeText={value => this.onChangeText('email', value)}
                    />
                  </Item>
                  <Item rounded style={styles.itemStyle}>
                    <Icon
                      active
                      name='lock'
                      style={styles.iconStyle}
                    />
                    <Input
                      style={styles.input}
                      placeholder='Password'
                      placeholderTextColor='#adb4bc'
                      returnKeyType='go'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      ref='SecondInput'
                      onChangeText={value => this.onChangeText('password', value)}
                    />
                  </Item>
                  <TouchableOpacity
                    onPress={() => this._signInAsync()}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('SignUp')}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ForgotPassword')}
                    style={styles.buttonStyle}>
                    <Text style={styles.buttonText}>
                      Forgot Password
                    </Text>
                  </TouchableOpacity>
                </View>
              </Container>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  input: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5a52a5',
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 350,
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  itemStyle: {
    marginBottom: 20,
  },
  iconStyle: {
    color: '#5a52a5',
    fontSize: 28,
    marginLeft: 15
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#667292',
    padding: 14,
    marginBottom: 20,
    borderRadius: 24,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#fff",
  },
  logoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 400,
    bottom: 180,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})