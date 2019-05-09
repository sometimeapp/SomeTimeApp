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
    promiseeFirstName: '',
    promiseeLastName: '',
    apiResponse: null,
    sending: false
  }

  async componentDidMount() {
    let userInfo = await this.getId();
    this.setState({
        promiseeID: userInfo.userID,
        promiseeFirstName: userInfo.firstName,
        promiseeLastName: userInfo.lastName,
    });
    //console.log('I should have been bound by now ' + this.state.promisorID)
}

getId = async () => {
    try {
        let userInfo = {};
        let user = await Auth.currentAuthenticatedUser()
        userInfo.userID = await user.attributes.sub;
        userInfo.firstName = await user.attributes.name;
        userInfo.lastName = await user.attributes.family_name;
        //console.log(user);
        return userInfo;
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
        "promiseeFirstName": this.state.promiseeFirstName,
        "promiseeLastName": this.state.promiseeLastName,
        "promiseDate": this.props.navigaton.getParam('date'),
        "promiseDueDate": this.props.navigaton.getParam('dueDate'),
        "promisorId": this.props.navigation.getParam('promisorID'),
        "promisorFirstName": this.props.navigation.getParam('promisorFirstName'),
        "promisorLastName": this.props.navigation.getParam('promisorLastName'),
        "pledgeStatus": 'pending',
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
        <Text>{this.props.navigation.getParam('pledgeStatus')}</Text>
        <Text>{this.props.navigation.getParam('terms')}</Text>
        <Text>{this.props.navigation.getParam('date')}</Text>
        <Text>{this.props.navigation.getParam('dueDate')}</Text>

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