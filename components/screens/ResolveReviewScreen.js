import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator
} from 'react-native';
import { Auth, API } from 'aws-amplify';

export default class ResolveReviewScreen extends React.Component {

  state = {
    apiResponse: null,
    sending: false
  }

  updatePledgeStatus = async () => {

    this.setState({sending: true});

    let apiName = 'PledgesCRUD'; 
    let path = '/pledges'; 
    let myInit = {
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      body: {
        "promiseeId" : this.props.navigation.getParam('promiseeId'),
        "promisorId" : this.props.navigation.getParam('promisorId'),
        "promiseDate" : this.props.navigation.getParam('promiseDate'),
        "promiseDueDate" : this.props.navigation.getParam('promiseDueDate'),
        "pledgeStatus": 'resolved',
        "promiseeFirstName" : this.props.navigation.getParam('promiseeFirstName'),
        "promiseeLastName" : this.props.navigation.getParam('promiseeLastName'),
        "promisorFirstName" : this.props.navigation.getParam('promisorFirstName'),
        "promisorLastName" : this.props.navigation.getParam('promisorLastName'),
        "terms" : this.props.navigation.getParam('terms'),
      }
    }

    API.put(apiName, path, myInit).then(response => {
      alert('Pledge successfully resolved!');
      this.props.navigation.navigate('Pledges');
    }).catch(error => {
      console.log(JSON.stringify(error.response))
    });
  }

  render() {

    return (

      <View style={styles.container}>
        <Text>{this.props.navigation.getParam('promisorId')}</Text>
        <Text>{this.props.navigation.getParam('promisorFirstName')}</Text>
        <Text>{this.props.navigation.getParam('promisorLastName')}</Text>
        <Text>{this.props.navigation.getParam('pledgeStatus')}</Text>
        <Text>{this.props.navigation.getParam('terms')}</Text>
        <Text>{this.props.navigation.getParam('date')}</Text>
        <Text>{this.props.navigation.getParam('dueDate')}</Text>

        <View style={{ margin: 5 }}>
        {
          !this.state.sending ? (
            <Button
            onPress={() => alert("Pledge Resolved!")}
            title="Resolve"
            onPress={() => this.updatePledgeStatus()}
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