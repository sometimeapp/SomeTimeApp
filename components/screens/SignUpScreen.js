import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth'

import {
  Input,
} from 'react-native-elements'

import ConfirmSignup from '../screenComponents/ConfirmScreen';
import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

var buttonFontSize = 16;
if (PixelRatio.get() <= 2) {
  buttonFontSize = 12;
}

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Sign Up',
    headerStyle: {
      backgroundColor: Colors.sometimeHeader
    },
    headerTintColor: Colors.sometimeSecondaryText
  };

  state = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    authCode: '',
    confirmationPending: false,
    passwordOnFocus: false
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value.trim() })
  }

  async signUp() {
    let { firstname, lastname, email, password } = this.state
    const name = firstname.charAt(0).toUpperCase() + firstname.slice(1);
    const username = email.toLowerCase();
    email = username;
    const family_name = lastname.charAt(0).toUpperCase() + lastname.slice(1);
    await Auth.signUp({
      username,
      password,
      attributes: { email, family_name, name }
    })
      .then(() => {
        this.setState({ confirmationPending: true });
        console.log('Sign up successful!')
        Alert.alert('Enter the confirmation code sent to your email address')
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when signing up: ', err)
          Alert('Error when signing up: ', err)
        } else {
          console.log('Error when signing up: ', err.message)
          Alert.alert('Error when signing up', err.message)
        }
      })
  }

  confirmSignUp = async () => {
    let { email, authCode } = this.state
    email = email.toLowerCase();
    await Auth.confirmSignUp(email, authCode)
      .then(() => {
        this.props.navigation.navigate('SignIn')
        Alert.alert('Account confirmed!');
        console.log('Confirm sign up successful')
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error when entering confirmation code: ', err)
          Alert.alert('Error when entering confirmation code: ', err)
        } else {
          console.log('Error when entering confirmation code: ', err.message)
          Alert.alert('Error when entering confirmation code: ', err.message)
        }
      })
  }

  resendSignUp = async () => {
    let { email } = this.state
    email = email.toLowerCase();
    await Auth.resendSignUp(email)
      .then(() => {
        this.setState({ confirmationPending: true });
        console.log('Confirmation code resent successfully');
        Alert.alert('Enter the confirmation code sent to your email address');
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error requesting new confirmation code: ', err)
          Alert.alert('Error requesting new confirmation code: ', err)
        } else {
          console.log('Error requesting new confirmation code: ', err.message)
          Alert.alert('Error requesting new confirmation code: ', err.message)
        }
      })
  }

  render() {
    if (this.state.confirmationPending) {
      return (
        <ConfirmSignup
          confirmSignUp={this.confirmSignUp}
          resendSignUp={this.resendSignUp}
          onChangeText={this.onChangeText}
        />
      )
    }
    else {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              textContentType="emailAddress"
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onSubmitEditing={() => this.firstname.focus()}
              onChangeText={value => this.onChangeText('email', value)}
            />
            <Input
              placeholder="First Name"
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onSubmitEditing={() => this.lastname.focus()}
              ref={ref => this.firstname = ref}
              onChangeText={value => this.onChangeText('firstname', value)}
            />
            <Input
              placeholder="Last Name"
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onSubmitEditing={() => this.password.focus()}
              ref={ref => this.lastname = ref}
              onChangeText={value => this.onChangeText('lastname', value)}
            />
            <Input
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              ref={ref => this.password = ref}
              onChangeText={value => this.onChangeText('password', value)}
              onFocus={() => this.setState({ passwordOnFocus: true })}
              onBlur={() => this.setState({ passwordOnFocus: false})}
            />
            <View>
              {this.state.passwordOnFocus ?
                (
                  <Text>
                    <Text style={{fontWeight: 'bold'}}>Password requirements:</Text>
                    {'\n\u2022'} 8 character minimum
                    {'\n\u2022'} 1 capital letter
                    {'\n\u2022'} 1 number
                    {'\n\u2022'} 1 special character
                  </Text>
                )
                : (null)}
            </View>
          </View>

          <View style={styles.resendContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.signUp()}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.resendSignUp()}
              style={styles.resendText}
            >
              <Text style={styles.buttonText}>
                Resend code
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sometimeBackground
  },
  inputContainer: {
    //backgroundColor: "pink",
    flex: 3,
    justifyContent: "space-around",
    alignItems: "center"
  },
  resendContainer: {
    flex: 3,
    //backgroundColor: "lime", 
    alignItems: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: Colors.sometimeTertiary,
    padding: 10,
    height: (Layout.window.height / 15),
    width: (Layout.window.width / 3),
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  buttonText: {
    fontSize: buttonFontSize,
    fontWeight: "bold"
  },
  resendText: {
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
  }
})