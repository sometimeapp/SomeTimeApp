import React from 'react'

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  Modal,
  FlatList,
  Animated,
} from 'react-native'

import {
  Container,
  Item,
  Input,
  Icon
} from 'native-base'

// AWS Amplify
import Auth from '@aws-amplify/auth'

  export default class SignUpScreen extends React.Component {
    state = {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      authCode: '',
    }
    onChangeText = (key, value) => {
      this.setState({[key]: value})
    }

    async signUp() {
      const {firstname, lastname, email, password} = this.state
      const name = firstname
      const username = email
      const family_name = lastname
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
        if (! err.message) {
          console.log('Error when signing up: ', err)
          Alert('Error when signing up: ', err)
        } else {
          console.log('Error when signing up: ', err.message)
          Alert.alert('Error when signing up', err.message)
        }
      })
    }

    async confirmSignUp() {
      const {email, authCode} = this.state
      await Auth.confirmSignUp(email, authCode)
      .then(() => {
        this.props.navigation.navigate('SignIn')
        console.log('Confirm sign up successful')
      })
      .catch(err => {
        if (! err.message) {
          console.log('Error when entering confirmation code: ', err)
          Alert.alert('Error when entering confirmation code: ', err)
        } else {
          console.log('Error when entering confirmation code: ', err.message)
          Alert.alert('Error when entering confirmation code: ', err.message)
        }
      })
    }

    async resendSignUp() {
      const { email } = this.state
      await Auth.resendSignUp(email)
      .then(() => console.log('Confirmation code resent successfully'))
      .catch(err => {
        if (! err.message) {
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
          <StatusBar/>
          <KeyboardAvoidingView 
            style={styles.container} 
            behavior='padding' 
            enabled>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                <Container style={styles.infoContainer}>
                  <View style={styles.container}>
                    {/* email section */}
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
                        secureTextEntry={false}
                        ref='ThirdInput'
                        onSubmitEditing={(event) => {this.refs.FourthInput._root.focus()}}
                        onChangeText={value => this.onChangeText('email', value)}
                      />
                    </Item>
                    {/* name section  */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
                        name='person'
                        style={styles.iconStyle}
                      />
                      <Input
                        style={styles.input}
                        placeholder='First Name'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'email-address'}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={(event) => {this.refs.SecondInput._root.focus()}}
                        onChangeText={value => this.onChangeText('firstname', value)}
                      />
                    </Item>
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
                        name='person'
                        style={styles.iconStyle}
                      />
                      <Input
                        style={styles.input}
                        placeholder='Last Name'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'email-address'}
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onSubmitEditing={(event) => {this.refs.SecondInput._root.focus()}}
                        onChangeText={value => this.onChangeText('lastname', value)}
                      />
                    </Item>
                    {/*  password section  */}
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
                        returnKeyType='next'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        // ref={c => this.SecondInput = c}
                        ref='SecondInput'
                        onSubmitEditing={(event) => {this.refs.ThirdInput._root.focus()}}
                        onChangeText={value => this.onChangeText('password', value)}
                      />
                    </Item>

                    <TouchableOpacity
                      onPress={() => this.signUp()}
                      style={styles.buttonStyle}>
                      <Text style={styles.buttonText}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                    {/* code confirmation section  */}
                    <Item rounded style={styles.itemStyle}>
                      <Icon
                        active
                        name='md-apps'
                        style={styles.iconStyle}
                      />
                      <Input
                        style={styles.input}
                        placeholder='Confirmation code'
                        placeholderTextColor='#adb4bc'
                        keyboardType={'numeric'}
                        returnKeyType='done'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={false}
                        onChangeText={value => this.onChangeText('authCode', value)}
                      />
                    </Item>
                    <TouchableOpacity
                      onPress={() => this.confirmSignUp()}
                      style={styles.buttonStyle}>
                      <Text style={styles.buttonText}>
                        Confirm Sign Up
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => this.resendSignUp()}
                      style={styles.buttonStyle}>
                      <Text style={styles.buttonText}>
                        Resend code
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
      backgroundColor: '#aa73b7',
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
      height: 570,
      bottom: 25,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30,
      backgroundColor: '#aa73b7',
    },
    itemStyle: {
      marginBottom: 10,
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
      marginBottom: 10,
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
      height: 600,
      bottom: 270,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    textStyle: {
      padding: 5,
      fontSize: 18
    },
    countryStyle: {
      flex: 1,
      backgroundColor: '#99ff',
      borderTopColor: '#211f',
      borderTopWidth: 1,
      padding: 12,
    },
    closeButtonStyle: {
      flex: 1,
      padding: 12,
      alignItems: 'center', 
      borderTopWidth: 1,
      borderTopColor: '#211f',
      backgroundColor: '#fff3',
    }
  })