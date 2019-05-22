import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

// AWS Amplifyß
import Auth from '@aws-amplify/auth'

import {
  Input,
} from 'react-native-elements'

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    email: '',
    password: '',
    isLoading: false
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value.trim() })
  }

  _signInAsync = async () => {
    this.setState({ isLoading: true });
    let { email, password } = this.state
    email = email.toLowerCase();
    await Auth.signIn(email, password)
      .then(user => {
        this.setState({ user })
        this.props.navigation.navigate('AuthLoading')
      })
      .catch(err => {
        this.setState({ isLoading: false });
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
        <View style={this.state.isLoading ? ({ opacity: 0.4, flex: 1, backgroundColor: 'black' }) : { opacity: 1, flex: 1 }}>
          {this.state.isLoading &&
            <View style={styles.loading}>
              <ActivityIndicator size='large' />
            </View>
          }
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>SomeTime</Text>
            <Text style={styles.subtitleText}>a ledger for casual contracts</Text>
          </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              textContentType="emailAddress"
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={value => this.onChangeText('email', value)}
            />
            <Input
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
              ref={ref => this.password = ref}
              onChangeText={value => this.onChangeText('password', value)}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonRowContainer}>
              <View style={styles.signInButtonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this._signInAsync()}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.signUpButtonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.passwordContainer}>
            <Text
              style={styles.buttonText}
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              Forgot Password?
          </Text>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 40
  },
  subtitleText: {
    fontSize: 16
  },
  inputContainer: {
    flex: 1,
    alignItems: "center"
  },
  buttonsContainer: {
    flex: 1,
  },
  buttonRowContainer: {
    flexDirection: "row",
    flex: 1,
  },
  signUpButtonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  signInButtonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: "30%",
    width: "66%",
    borderRadius: 10
  },
  buttonText: {
    fontWeight: "bold"
  },
  passwordContainer: {
    flex: 1,
    alignItems: "center",
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  }
})