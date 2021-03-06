import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Auth } from 'aws-amplify';

import { CustomIcon } from '../../constants/iconInfo';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

export default class HomeScreen extends React.Component {
  state = {
    firstName: ''
  }

  static navigationOptions = {
    headerTitle: 'Home',
    headerStyle: {
      backgroundColor: Colors.sometimeHeader
    },
    headerTintColor: Colors.sometimeSecondaryText
  };

  async componentDidMount() {
    let userInfo = await this.getId();
    this.setState({
      firstName: userInfo.firstName,
    });
  }

  getId = async () => {
    try {
      let userInfo = {};
      let user = await Auth.currentAuthenticatedUser()
      userInfo.firstName = await user.attributes.name;
      return userInfo;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          {
            this.state.firstName ? (
              <Text style={styles.welcomeText}>Welcome, {this.state.firstName}!</Text>
            ) : (null)
          }
        </View>

        <View style={styles.makeButtonView}>
          <TouchableOpacity
            style={{ ...styles.button, backgroundColor: Colors.sometimeBackground}}
            onPress={() => this.props.navigation.navigate('Terms')}>
            <CustomIcon name="handshake" size={Layout.homeIconSize} color={Colors.sometimePrimary}/>
            <Text style={{ ...styles.buttonText}}>Make a Pledge</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.acceptButtonView}>
          <TouchableOpacity
          style={{ ...styles.button, backgroundColor: Colors.sometimeBackground}}
            onPress={() => this.props.navigation.navigate('Receive')}>
            <MaterialCommunityIcons name="qrcode-scan" size={Layout.homeIconSize} color={Colors.sometimeSecondary}/>
            <Text style={{ ...styles.buttonText}}>Receive/Resolve</Text>
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sometimeBackground
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: Layout.homeButtonFontSize,
    color: Colors.sometimeBackgroundText,
    fontWeight: 'bold'
  },
  makeButtonView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  acceptButtonView: {
    flex: 2,
    alignItems: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: Layout.homeButtonHeight,
    width: Layout.homeButtonWidth,
    // borderRadius: 10,
    // shadowColor: 'rgba(0,0,0, .4)', // IOS
    // shadowOffset: { height: 1, width: 1 }, // IOS
    // shadowOpacity: 1, // IOS
    // shadowRadius: 1, //IOS
    // elevation: 10, // Android
  },
  buttonText: {
    fontSize: Layout.homeButtonFontSize,
     fontWeight: "bold",
     color: 'black'
  },
});
