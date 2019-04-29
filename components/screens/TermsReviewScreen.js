import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import { Auth, API } from 'aws-amplify';

export default class TermsReviewScreen extends React.Component {

  state = {
    promiseeID: '',
    apiResponse: null,
    sending: false
  }

  async componentDidMount() {
    let promiseeID = await this.getId();
    this.setState({ promiseeID: promiseeID });
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

  savePledge = async () => {

    this.setState({sending: true});

    let apiName = 'PledgesCRUD'; 
    let path = '/pledges'; 
    let myInit = {
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      body: {
        "promiseeId": this.state.promiseeID,
        "promiseDate": new Date(),
        "promisorId": this.props.navigation.getParam('promisorID'),
        "status": 'pending',
        "terms": this.props.navigation.getParam('terms')
      }
    }

    API.post(apiName, path, myInit).then(response => {
      alert('Pledge successfully made!');
      this.props.navigation.navigate('Home');
    }).catch(error => {
      console.log(JSON.stringify(error.response))
    });
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

        <View style={{ margin: 5 }}>
        {
          !this.state.sending ? (
            <Button
            onPress={() => alert("You've accepted")}
            title="Accept"
            onPress={() => this.savePledge()}
          />
          ) : (
            <ActivityIndicator />
          )
        }
          </View>
          <View style={{ margin: 5 }}>
          <Button
            disabled={this.state.sending ? true : false}
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
  }
});