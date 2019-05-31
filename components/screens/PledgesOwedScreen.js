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
    isFetching: false,
    showResolved: true
  }

  static navigationOptions = {
    title: 'Pledges Owed to Me',
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      toggleResolved: this.toggleResolved,
      showResolved: this.state.showResolved
    })

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

  toggleResolved = () => {
    const position = this.state.showResolved;
    this.setState({showResolved: !position})
    this.props.navigation.setParams({
      showResolved: this.state.showResolved
    })
  }

  onRefresh = async () => {
    this.setState({ isFetching: true });
    const newPledges = await getData(this.state.promiseeId, null);
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
      return userInfo;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    let { pledgesOwed, showResolved } = this.state;
    if(!showResolved) {
      pledgesOwed = pledgesOwed.filter( item => item.pledgeStatus === 'pending')
    }
    if (!this.state.pledgesOwed || this.state.isFetching) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={pledgesOwed}
            keyExtractor={(x, i) => i.toString()}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            ListEmptyComponent={
              <View style={{ flex: 1, justifyContent: "center", paddingTop: 25 }}>
                <Text style={{ fontSize: 16, textAlign: 'center' }}>You have no pledges owed to you.</Text>
                <Text style={{ fontSize: 14, textAlign: 'center', paddingTop: 10 }}>(Pull to refresh)</Text>
              </View>
            }
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Details', { ...item, screen: 'owed' })}
                >
                  <PledgeCard
                    pledge={item}
                    screen={this.props.navigation.state.routeName}
                  />

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
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: "10%",
    width: "25%",
    borderRadius: 10
  },
  buttonText: {
    fontWeight: "bold"
  },
});
