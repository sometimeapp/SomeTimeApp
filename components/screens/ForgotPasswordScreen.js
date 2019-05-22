import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity
} from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth'

import {
  Input,
} from 'react-native-elements'

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Forgot Password',
  };

  state = {
    email: '',
    newPassword: '',
    authCode: ''
  }

  onChangeText = (key, value) => {
    this.setState({ [key]: value.trim() })
  }

  // Request a new password
  async forgotPassword() {
    let { email } = this.state
    email = email.toLowerCase();
    await Auth.forgotPassword(email)
      .then(data => console.log('New code sent', data))
      .catch(err => {
        if (!err.message) {
          console.log('Error while setting up the new password: ', err)
          Alert.alert('Error while setting up the new password: ', err)
        } else {
          console.log('Error while setting up the new password: ', err.message)
          Alert.alert('Error while setting up the new password: ', err.message)
        }
      })
  }
  // Upon confirmation, redirect the user to the Sign In page
  async forgotPasswordSubmit() {
    let { email, authCode, newPassword } = this.state
    email = email.toLowerCase();  
    await Auth.forgotPasswordSubmit(email, authCode, newPassword)
      .then(() => {
        this.props.navigation.navigate('SignIn')
        console.log('the New password submitted successfully')
      })
      .catch(err => {
        if (!err.message) {
          console.log('Error while confirming the new password: ', err)
          Alert.alert('Error while confirming the new password: ', err)
        } else {
          console.log('Error while confirming the new password: ', err.message)
          Alert.alert('Error while confirming the new password: ', err.message)
        }
      })
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

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
            onChangeText={value => this.onChangeText('email', value)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.forgotPassword()}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>

          <Input
            placeholder="New Password"
            textContentType="password"
            secureTextEntry={true}
            autoCorrect={false}
            containerStyle={{ width: "95%" }}
            inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
            onSubmitEditing={() => this.confirmationCode.focus()}
            onChangeText={value => this.onChangeText('newPassword', value)}
          />
          <Input
            placeholder="Confirmation Code"
            keyboardType={'numeric'}
            autoCorrect={false}
            containerStyle={{ width: "95%" }}
            inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
            ref={ref => this.confirmationCode = ref}
            onChangeText={value => this.onChangeText('authCode', value)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => this.forgotPasswordSubmit()}>
            <Text style={styles.buttonText}>Confirm Password</Text>
          </TouchableOpacity>
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
    alignItems: "center",
  },
  buttonView: {
    flex: 1,
    alignItems: "center",
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