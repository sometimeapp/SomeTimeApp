import React from 'react';
import {
  Text,
  StyleSheet,
  View, 
  ActivityIndicator
} from 'react-native';
import { Auth, API } from 'aws-amplify';

export default class PledgeDetailsScreen extends React.Component {

  static navigationOptions = {
    title: '',
  };

  async componentDidMount() {
    console.log("I AM MOUNTING THE MADE SCREEN!")  
    let userInfo = await this.getId();
    let promisorId = userInfo.userID;

    let response = await this.getData(promisorId);
    this.setState({pledgesMade: response})
    //console.log(response);
  }

async getData(promisorId) { 
    let apiName = 'PledgesCRUD';
    let path = `/pledges/${promisorId}?message=index`;
    // let myInit = { // OPTIONAL
    //     headers: {}, 
    //     queryStringParameters: {  //probably not necessary
    //       promisorId: promisorId
    //     } // OPTIONAL
    // }
    return await API.get(apiName, path);
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

  render() {

    return (
      <View style={styles.container}>
        <Text>Welcome to the Pledge Details Screen</Text>
      </View>
    );
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
