import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Auth, API } from 'aws-amplify';

export default class TermsReviewScreen extends React.Component {

  state = {
    promiseeID: '',
    apiResponse: null,
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
    // let newPledge = {
    //   body: {
        // "promiseeId": this.state.promiseeID,
        // "promiseDate": new Date(),
        // "promisorId": this.props.navigation.getParam('promisorID'),
        // "status": this.state.status,
        // "terms": this.state.terms
    //   }
    // }
    // const path = "/pledges";
    // let apiResponse;

    // // Use the API module to save the pledge to the database
    // try {
    //   apiResponse = await API.put("PledgesCRUD", path, newPledge)
    //   console.log("response from saving pledge: ", + apiResponse);
    //   this.setState({apiResponse});
    // } catch (e) {
    //   console.log("logging API error");
    //   console.log(apiResponse);
    //   console.log(e);
    // }

    let apiName = 'PledgesCRUD'; // replace this with your api name.
    let path = '/pledges'; //replace this with the path you have configured on your API
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
          <Button
            onPress={() => alert("You've accepted")}
            title="Accept"
            onPress={() => this.savePledge()}
          />
          </View>
          <View style={{ margin: 5 }}>
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
  }
});