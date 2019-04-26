import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Auth } from 'aws-amplify';

export default class TermsReviewScreen extends React.Component {

  state = {
    promiseeID: ''
  }

  async componentDidMount() {
    let promiseeID = await this.getId();
    this.setState({promiseeID: promiseeID});
    console.log('I should have been bound by now ' + this.state.promiseeID)
  }

  getId = async () => {
    try {
        let user = await Auth.currentAuthenticatedUser()
        let userID = await user.attributes.sub
        //console.log(userID)
        return userID;
    } catch (error) {
        console.log(error);
    }
}


  /*
            promiserID: '67890876567890ghjklkjhgfyui',
            promiseeID: '567890987656789ghjkljhghjfd',
            status: 'pending',
            terms: 'Beer',
            date: new Date()
        }
  */

  async savePledge() {
    let newPledge = {
      body: {
        "promiseeId": this.props.navigation.getParam('promiseeID'),
        "promiseDate": new Date(),
        "promisorId": this.props.navigation.getParam('pro')
      }
    }
  }

  render() {

    return (

      <View style={styles.container}>
        <Text>{this.props.navigation.getParam('promisorID')}</Text>
        <Text>{this.props.navigation.getParam('promisorFirstName')}</Text>
        <Text>{this.props.navigation.getParam('promisorLastName')}</Text>
        <Text>{this.state.promiseeID}</Text>
        <Text>{this.props.navigation.getParam('status')}</Text>
        <Text>{this.props.navigation.getParam('terms')}</Text>
        <Text>{this.props.navigation.getParam('date')}</Text>

        <View >
          <Button
              style={styles.button}
              title="Accept"
              //onPress={() => this.props.navigation.navigate('QR')}
              onPress={() => alert("You've accepted")}
          />
          <Button
            style={styles.button}
            title="Reject"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  button: {
    padding: 20,
  }
});