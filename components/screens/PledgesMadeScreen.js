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


export default class PledgesMadeScreen extends React.Component {

  state = {
    pledgesMade: null
  }

  static navigationOptions = {
    title: 'Pledges I Made',
  };

  async componentDidMount() {
    console.log("I AM MOUNTING THE MADE SCREEN!")
    let userInfo = await this.getId();
    let promisorId = userInfo.userID;

    let response = await this.getData(promisorId);
    this.setState({ pledgesMade: response })
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
        {
          !this.state.pledgesMade ? (
            <ActivityIndicator></ActivityIndicator>
          ) : (
              <FlatList
                data={this.state.pledgesMade}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => (
                  <View>
                    <TouchableHighlight
                      onPress={() => this.props.navigation.navigate('Details')}
                    >
                      <Card>
                        <Text>{"I owe " + item.promiseeFirstName + " " + item.promiseeLastName}</Text>
                        <Text>{item.terms}</Text>
                      </Card>
                    </TouchableHighlight>
                  </View>

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
