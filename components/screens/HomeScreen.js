import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { Auth } from 'aws-amplify';

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
    console.log("rendering the home screen!")
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
        {
          this.state.firstName ? (
            <Text style={styles.welcomeText}>Welcome {this.state.firstName}!</Text>
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
              <Text style={styles.buttonText}>Receive</Text>
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
    //ackgroundColor: "skyblue",
    justifyContent: "center",
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 18
  },
  makeButtonView: {
    flex: 2, 
    //backgroundColor: "lime",
    justifyContent: "center",
    alignItems: "center"
  },
  acceptButtonView: {
    flex: 2, 
    //backgroundColor: "pink",
    //justifyContent: "center",
    alignItems: "center"
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: "50%",
    width: "40%",
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold"
  },
});
