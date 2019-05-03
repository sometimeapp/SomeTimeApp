import React from 'react';
import {
  Text,
  StyleSheet,
  View, 
  FlatList,
  ActivityIndicator, 
  TouchableHighlight 
} from 'react-native';
import { Auth, API } from 'aws-amplify';
import { Card } from 'react-native-elements';
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

    return (
      <View style={styles.container}>
        {
          !this.state.pledgesOwed ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
            <FlatList 
              data={this.state.pledgesOwed}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item }) => (
                <TouchableHighlight
                onPress={() => this.props.navigation.navigate("Details")}
                >
                  <Card>
                    <Text>{item.promisorFirstName + " " + item.promisorLastName}</Text>
                    <Text>{item.terms}</Text>
                  </Card>
                </TouchableHighlight>
              
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
  }
});
