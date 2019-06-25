import React from 'react'

import {
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  PixelRatio
} from 'react-native'

import {
  Input,
} from 'react-native-elements'

// AWS Amplify
import Auth from '@aws-amplify/auth'

// var buttonFontSize = 16;
// if (PixelRatio.get() <= 2) {
//   buttonFontSize = 12;
// }

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Settings',
    headerStyle: {
      backgroundColor: Colors.sometimeHeader
    },
    headerTintColor: Colors.sometimeSecondaryText
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
  };

  _changePasswordAsync = async () => {
    Auth.currentAuthenticatedUser()
      .then(user => {
        return Auth.changePassword(user, this.state.oldPassword, this.state.newPassword);
      })
      .then(data => {
        alert("Password successfully changed!");
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        //  NOTE -- these error alerts are currently overridden by default notifications from Amplify
        switch (err.code) {
          case ("NotAuthorizedException"):
            alert("Old password is incorrect!");
            break;

          case ("InvalidParameterException"):
            alert("New password must be at least 8 characters and include at least one uppercase character, one lowercase character, one number, and one special character");
            break;

          default:
            alert("Unknown error!");
        }
        console.log(err);
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
            secureTextEntry={true}
            autoCorrect={false}
            containerStyle={{ width: "95%" }}
            inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
            onChangeText={value => this.onChangeText('oldPassword', value)}
            onSubmitEditing={() => this.newPassword.focus()}
          />

          <Input
            placeholder="New Password"
            textContentType="password"
            secureTextEntry={true}
            autoCorrect={false}
            containerStyle={{ width: "95%" }}
            inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0, padding: 15 }}
            ref={ref => this.newPassword = ref}
            onChangeText={value => this.onChangeText('newPassword', value)}
          />

          <TouchableOpacity
            onPress={() => this._changePasswordAsync()}
            style={{ ...styles.button, backgroundColor: Colors.sometimeTertiary }}>
            <Text style={styles.buttonText}>
            Submit
            </Text>
          </TouchableOpacity>

        </View >

      <View style={styles.buttonView}>
        <TouchableOpacity
          style={{ ...styles.button, backgroundColor: Colors.sometimeSecondary }}
          onPress={() => this._signOutAsync()}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>

      </SafeAreaView >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sometimeBackground
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
  headingText: {
    fontSize: 20
  }
})
