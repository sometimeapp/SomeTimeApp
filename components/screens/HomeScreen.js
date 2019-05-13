import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { Auth } from 'aws-amplify';

import PledgeCard from '../screenComponents/PledgeCard'

const staticPromiseList = [
  {
    "pledgeStatus": "resolved",
    "promiseDate": "2019-05-08T20:41:40.020Z",
    "promiseeFirstName": "Zach",
    "promiseeId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
    "promiseeLastName": "Daniels",
    "promisorFirstName": "Jonathan",
    "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
    "promisorLastName": "Adler",
    "terms": "Hope",
  },
  {
    "pledgeStatus": "pending",
    "promiseDate": "2019-05-08T21:17:58.709Z",
    "promiseeFirstName": "Zach",
    "promiseeId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
    "promiseeLastName": "Daniels",
    "promisorFirstName": "Jonathan",
    "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
    "promisorLastName": "Adler",
    "terms": "This will work",
  },
  {
    "pledgeStatus": "pending",
    "promiseDate": "2019-05-09T23:06:13.491Z",
    "promiseDueDate": "2019-05-12T23:06:13.492Z",
    "promiseeFirstName": "Zach",
    "promiseeId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
    "promiseeLastName": "Daniels",
    "promisorFirstName": "Jonathan",
    "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
    "promisorLastName": "Adler",
    "terms": "This will work or die",
  },
  {
    "pledgeStatus": "pending",
    "promiseDate": "2019-07-16T21:48:22.727Z",
    "promiseDueDate": "2019-07-16T21:48:22.727Z",
    "promiseeFirstName": "rusty",
    "promiseeId": "bc3b95c3-955d-41bc-9985-343478136233",
    "promiseeLastName": "shackleford",
    "promisorFirstName": "Jonathan",
    "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
    "promisorLastName": "Adler",
    "terms": "a coffee",
  },
]

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
  //   return (
  //     <PledgeCard pledge={staticPromiseList[3]} />
  //   )
    
  // }
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
