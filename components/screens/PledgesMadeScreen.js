import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Auth } from 'aws-amplify';
import { Card } from 'react-native-elements';
import { getData } from '../../utilities/services'

import PledgeCard from '../screenComponents/PledgeCard'


export default class PledgesMadeScreen extends React.Component {

  state = {
    pledgesMade: null, 
    isFetching: false
  }

  static navigationOptions = {
    title: 'Pledges I Made',
  };

  async componentDidMount() {
    console.log("I AM MOUNTING THE MADE SCREEN!")
    let userInfo = await this.getId();
    let promisorId = userInfo.userID;
    this.setState({isFetching: true});
    const apiData = await getData(promisorId, "index");
    this.setState({
      promisorId: promisorId,
      pledgesMade: apiData,
      isFetching: false
    })
  }

  onRefresh = async () => {
    console.log("calling onRefresh...")
    this.setState({ isFetching: true });
    const newPledges = await getData(this.state.promisorId, "index");
    console.log("Yo!  The new pledges are....")
    console.log(newPledges)
    this.setState({
      pledgesMade: newPledges,
      isFetching: false})
 }

  // getData = async (promisorId) => {
  //   console.log("getting data from api...")
  //   let apiName = 'PledgesCRUD';
  //   let path = `/pledges/${promisorId}?message=index`;
  //   let apiData = await API.get(apiName, path);
  //   return apiData;
  // }

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
    console.log("YO! THE STATE IS:")
    console.log(this.state.pledgesMade);
    return (
      <View style={styles.container}>
        {
          !this.state.pledgesMade ? (
            <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large"></ActivityIndicator>
            </View>
          ) : (
            
              <FlatList
                data={this.state.pledgesMade}
                keyExtractor={(x, i) => i.toString()}
                onRefresh={() => this.onRefresh()}
                refreshing={this.state.isFetching}

                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Details', {...item, screen: 'made'})}
                    >
                    <PledgeCard 
                    pledge={item} 
                    screen={this.props.navigation.state.routeName} />

                    </TouchableOpacity>
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
  indicatorContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center"
  },
  container: {
    flex: 1,
  }
});
