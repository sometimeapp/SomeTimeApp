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
import { getData } from '../../utilities/services';

import PledgeCard from '../screenComponents/PledgeCard'

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
    this.setState({ isFetching: true });
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
      isFetching: false
    })
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
    // console.log("YO! THE STATE IS:")
    // console.log(this.state.pledgesOwed);
    if (!this.state.pledgesOwed || this.state.isFetching) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      )
    } else if (this.state.pledgesOwed.length === 0) {
      return (
        <View style={styles.contaienr}>
          <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}>You do not have any pledges owed to you.</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.pledgesOwed}
            keyExtractor={(x, i) => i.toString()}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}

            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Details', { ...item, screen: 'owed' })}
                >
                  <PledgeCard
                    pledge={item}
                    screen={this.props.navigation.state.routeName} />

                </TouchableOpacity>
              </View>

            )}
          />
        </View>
      )
    }
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
