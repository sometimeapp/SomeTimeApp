import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';


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
            <Image
              source={require('../../assets/images/handshakeSmall-transparent.png')}
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              textContentType="emailAddress"
              autoCorrect={false}
              containerStyle={{ width: Layout.inputWidth}}
              inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              onSubmitEditing={() => this.password.focus()}
              onChangeText={value => this.onChangeText('email', value)}
            />
            <Input
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              autoCorrect={false}
              containerStyle={{width: Layout.inputWidth}}
              inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              ref={ref => this.password = ref}
              onChangeText={value => this.onChangeText('password', value)}
            />
          </View>

          <View style={styles.buttonsContainer}>

            <View style={{ ...styles.buttonRow, justifyContent: "flex-start" }}>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: Colors.sometimeTertiary}}
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={{ ...styles.buttonRow, justifyContent: "flex-end" }}>
              <TouchableOpacity
                style={{...styles.button, backgroundColor: Colors.sometimeHeader}}
                onPress={() => this._signInAsync()}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>
            </View>

          </View>

          <View style={styles.forgotPasswordContainer}>
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
    backgroundColor: Colors.sometimeBackground
  },
  titleContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Layout.imageTopMargin
  },
  titleText: {
    fontSize: 40
  },
  subtitleText: {
    fontSize: 16
  },
  inputContainer: {
    flex: 1,
    //backgroundColor: "lime",
    alignItems: "center",
    justifyContent: "space-around"
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "yellow"
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "silver", 
    justifyContent: "center",
    alignItems: "center",
    margin: Layout.authButtonMargin
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
  forgotPasswordContainer: {
    flex: 1,
    alignItems: "center",
    //backgroundColor: "aqua"
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