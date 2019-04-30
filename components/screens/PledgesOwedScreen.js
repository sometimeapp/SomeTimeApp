import React from 'react';
import {
  Text,
  StyleSheet,
  View, 
  FlatList, 
  ListItem
} from 'react-native';
import { Auth, API } from 'aws-amplify';

export default class PledgesOwedScreen extends React.Component {

  state = {
    pledgesOwed: null
  }

  static navigationOptions = {
    title: 'Owed',
  };

  async componentDidMount() {
    console.log("I AM MOUNTING THE OWED SCREEN!")  
    let userInfo = await this.getId();
    let promiseeId = userInfo.userID;

    let response = await this.getData(promiseeId);
    this.setState({pledgesOwed: response})
    //console.log(response);

  }

async getData(promiseeId) { 
    let apiName = 'PledgesCRUD';
    let path = `/pledges/${promiseeId}`;
    // let myInit = { // OPTIONAL
    //     headers: {}, 
    //     queryStringParameters: {  //probably not necessary
    //       promiseeId: promiseeId
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
    let pledgeList = [];
    if(this.state.pledgesOwed) {
      for(let pledge in this.state.pledgesOwed) {
        pledgeList.push(          
        <View>
          <Text>{pledge.terms}</Text>
        </View>
        )
      }
    }

    return (
      <View style={styles.container}>
        {
          !this.state.pledgesOwed ? (
            <Text>Welcome to the Pledges Owed screen</Text>
          ) : (
            <FlatList 
              data={this.state.pledgesOwed}
              renderItem={({ item }) => (
                <Text>{item.terms}</Text>
              )}
            />
          )
        }
        
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
