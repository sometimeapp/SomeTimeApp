import React from 'react'

import {
  AsyncStorage,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
} from 'react-native'

import {
  Input,
} from 'react-native-elements'

// import {
//   Container,
//   Item,
//   Input,
//   Icon,
// } from 'native-base'

// AWS Amplify
import Auth from '@aws-amplify/auth'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Settings',
  };

  state = {
    oldPassword: '',
    newPassword: '',
  }


  onChangeText = (key, value) => {
    this.setState({ [key]: value.trim() })
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    console.log("signed out!")
  };

  _changePasswordAsync = async () => {
    console.log(this.state);
    Auth.currentAuthenticatedUser()
    .then(user => {
        return Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);
    })
    .then( data => {
      console.log(data)
      alert("Password successfully changed!");
      this.props.navigation.navigate('Home');
    })
    .catch(err => {
      //  NOTE -- these error alerts are currently overridden by default notifications from Amplify
      switch(err.code) {
        case("NotAuthorizedException") : 
        alert("Old password is incorrect!");
        break;

        case("InvalidParameterException") :
        alert("New password must be at least 8 characters and include at least one uppercase character, one lowercase character, one number, and one special character");
        break;

        default: 
        alert("Unknown error!");
      }


      console.log(err)
      alert(err.message);
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={styles.changePasswordContainer}>

          <View style={styles.headerContainer}>
            <Text style={styles.headingText}>Change Password</Text>
          </View>

          <Input
                placeholder="Old Password"
                textContentType="password"
                secureTextEntry={false}
                autoCorrect={false}
                containerStyle={{ width: "95%" }}
                inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
                inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
                onChangeText={value => this.onChangeText('oldPassword', value)}
                onSubmitEditing={() => this.newPassword.focus()}
          />

          <Input
                placeholder="New Password"
                textContentType="password"
                secureTextEntry={false}
                autoCorrect={false}
                containerStyle={{ width: "95%" }}
                inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
                inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
                ref={ref => this.newPassword = ref}
                onChangeText={value => this.onChangeText('newPassword', value)}
          />

          <TouchableOpacity
                onPress={() => this._changePasswordAsync()}
                style={styles.button}>
                <Text style={styles.buttonText}>
                  Submit
                </Text>
          </TouchableOpacity>

        </View>

        <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={ () => this._signOutAsync() }>
                  <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
        </View>
      
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  changePasswordContainer: {
    flex: 1,
    justifyContent: "center",
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
  headingText: {
    fontSize: 20
  }

})
