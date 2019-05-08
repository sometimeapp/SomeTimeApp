import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';
import { Auth } from 'aws-amplify';
import { Card } from 'react-native-elements';
import { getData } from '../../utilities/services'

export default class PledgesOwedScreen extends React.Component {

  state = {
    pledgesOwed: null, 
    isFetching: false
  }

  static navigationOptions = {
    title: 'Pledges Owed to Me',
  };

  async componentDidMount() {
    console.log("I AM MOUNTING THE OWED SCREEN!")
    let userInfo = await this.getId();
    let promiseeId = userInfo.userID;
    this.setState({isFetching: true});
    const apiData = await getData(promiseeId, null);
    this.setState({
      promiseeId: promiseeId,
      pledgesOwed: apiData,
      isFetching: false
    })
  }

  onRefresh = async () => {
    console.log("calling onRefresh...")
    this.setState({ isFetching: true });
    const newPledges = await getData(this.state.promiseeId, null);
    console.log("Yo!  The new pledges are....")
    console.log(newPledges)
    this.setState({
      pledgesOwed: newPledges,
      isFetching: false})
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
              onRefresh={() => this.onRefresh()}
              refreshing={this.state.isFetching}
              renderItem={({ item }) => (
                <TouchableHighlight
                onPress={() => this.props.navigation.navigate("Details",  {...item, screen: 'owed'})}
                >
                  <Card>
                    <Text>{item.promisorFirstName + " " + item.promisorLastName + " owes"}</Text>
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
