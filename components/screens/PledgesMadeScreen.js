import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity, 
  Button
} from 'react-native';
import { Auth } from 'aws-amplify';
import { getData } from '../../utilities/services'

import PledgeCard from '../screenComponents/PledgeCard'

export default class PledgesMadeScreen extends React.Component {

  state = {
    pledgesMade: null,
    isFetching: false
  }

  static navigationOptions = {
    title: "Pledges I've Made",
  };

  async componentDidMount() {
    console.log("I AM MOUNTING THE MADE SCREEN!")
    let userInfo = await this.getId();
    let promisorId = userInfo.userID;
    this.setState({ isFetching: true });
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
      isFetching: false
    })
  }

  getId = async () => {
    try {
      let userInfo = {};
      let user = await Auth.currentAuthenticatedUser()
      userInfo.userID = await user.attributes.sub;
      userInfo.firstName = await user.attributes.name;
      userInfo.lastName = await user.attributes.family_name;;
      return userInfo;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    //console.log("YO! THE STATE IS:")
    //console.log(this.state.pledgesMade);
    if (!this.state.pledgesMade || this.state.isFetching) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator size="large"></ActivityIndicator>
        </View>
      )
    } else if (this.state.pledgesMade.length === 0) {
      return (
        <View style={{flex: 1}}>
          <View style={{flex: 1, justifyContent: "center"}}>
            <Text style={{ fontSize: 16, textAlign: 'center' }}>You have not made any pledges.</Text>
          </View>

          <View style={{flex: 4, alignItems: "center"}}>
              <TouchableOpacity
                style={styles.button}
                onPress={ () => this.onRefresh() }>
                <Text style={styles.buttonText}>Refresh</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.pledgesMade}
            keyExtractor={(x, i) => i.toString()}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}

            renderItem={({ item }) => (
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Details', { ...item, screen: 'made' })}
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
