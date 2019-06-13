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

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

// var buttonFontSize = 16;
// if (PixelRatio.get() <= 2) {
//   buttonFontSize = 12;
// }

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Forgot Password',
    headerStyle: {
      backgroundColor: Colors.sometimeHeader
    },
    headerTintColor: Colors.sometimeSecondaryText
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
      .then(Alert.alert('Enter the confirmation code sent to your email address'))
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
        Alert.alert('Password successfully changed.');
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

        {/* <View style={styles.titleContainer}>
          <Text style={styles.titleText}>SomeTime</Text>
          <Text style={styles.subtitleText}>a ledger for casual contracts</Text>
        </View> */}

        <View style={styles.inputContainer}>
          <Input
            placeholder="Email"
            textContentType="emailAddress"
            autoCorrect={false}
            containerStyle={{ width: Layout.inputWidth }}
            inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              marginTop: Layout.forgotPasswordMargin,
              marginBottom: Layout.forgotPasswordMargin
            }}
            onChangeText={value => this.onChangeText('email', value)}
          />
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: Colors.sometimeTertiary }}
            onPress={() => this.forgotPassword()}>
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>

          <Input
            placeholder="New Password"
            textContentType="password"
            secureTextEntry={true}
            autoCorrect={false}
            containerStyle={{ width: Layout.inputWidth }}
            inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              marginTop: Layout.forgotPasswordMargin,
              marginBottom: Layout.forgotPasswordMargin
            }}
            onSubmitEditing={() => this.confirmationCode.focus()}
            onChangeText={value => this.onChangeText('newPassword', value)}
          />
          <Input
            placeholder="Confirmation Code"
            keyboardType={'numeric'}
            autoCorrect={false}
            containerStyle={{ width: Layout.inputWidth }}
            inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0, marginBottom: Layout.forgotPasswordMargin }}
            ref={ref => this.confirmationCode = ref}
            onChangeText={value => this.onChangeText('authCode', value)}
          />

          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: Colors.sometimeSecondary }}
            onPress={() => this.forgotPasswordSubmit()}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sometimeBackground
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
    padding: 10,
    height: Layout.buttonHeight,
    width: Layout.buttonWidth,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  buttonText: {
    fontSize: Layout.buttonFontSize,
    fontWeight: "bold"
  },
})