import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth'

import {
  Input,
} from 'react-native-elements'

export default class SignUpScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Sign Up',
  };

  state = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
    authCode: '',
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

  async confirmSignUp() {
    let { email, authCode } = this.state
    email = email.toLowerCase();
    await Auth.confirmSignUp(email, authCode)
      .then(() => {
        this.props.navigation.navigate('SignIn')
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

  async resendSignUp() {
    let { email } = this.state
    email = email.toLowerCase();
    await Auth.resendSignUp(email)
      .then(() => console.log('Confirmation code resent successfully'))
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
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
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
              onSubmitEditing={() => this.firstname.focus()}
              onChangeText={value => this.onChangeText('email', value)}
            />
            <Input
              placeholder="First Name"
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
              onSubmitEditing={() => this.lastname.focus()}
              ref={ref => this.firstname = ref}
              onChangeText={value => this.onChangeText('firstname', value)}
            />
            <Input
              placeholder="Last Name"
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
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
              inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
              ref={ref => this.password = ref}
              onChangeText={value => this.onChangeText('password', value)}
            />
          </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.signUp()}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Confirmation Code"
              keyboardType="numeric"
              returnKeyType="done"
              autoCorrect={false}
              containerStyle={{ width: "95%" }}
              inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
              onChangeText={value => this.onChangeText('authCode', value)}
            />
          </View>
          

            <View style={styles.bottomButtonsView}>
            <TouchableOpacity
              onPress={() => this.confirmSignUp()}
              style={styles.button}>
              <Text style={styles.buttonText}>
                Confirm Sign Up
              </Text>
            </TouchableOpacity>
            </View>
            
            <View style={styles.bottomButtonsView}>
            <TouchableOpacity
              onPress={() => this.resendSignUp()}
              style={styles.button}>
              <Text style={styles.buttonText}>
                Resend code
              </Text>
            </TouchableOpacity>
            </View>
            
         
        </ScrollView>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flex: 1,
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
  buttonView: {
    flex: 1,
    alignItems: "center",
  },
  bottomButtonsView: {
    flex: 1,
    alignItems: "center",
    marginBottom: 15
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#DDDDDD',
    padding: 10,
    width: "83%",
    borderRadius: 10
  },
  buttonText: {
    fontWeight: "bold"
  }
})