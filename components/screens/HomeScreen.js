import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  PixelRatio
} from 'react-native';
import { Auth } from 'aws-amplify';

var buttonFontSize = 20;
if (PixelRatio.get() <= 2) {
  buttonFontSize = 16;
}

const devHeight = Dimensions.get('window').height;
const devWidth = Dimensions.get('window').width;

export default class HomeScreen extends React.Component {
  state = {
    firstName: ''
  }

  static navigationOptions = {
    headerTitle: 'Home',
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
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Terms')}>
            <Text style={styles.buttonText}>Make a Pledge</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.acceptButtonView}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Receive')}>
            <Text style={styles.buttonText}>Receive/Resolve</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 18
  },
  makeButtonView: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  acceptButtonView: {
    flex: 2,
    alignItems: "center"
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: devHeight/6,
    width: devWidth/2,
    borderRadius: 10
  },
  buttonText: {
    fontSize: buttonFontSize,
    fontWeight: "bold"
  },
});
