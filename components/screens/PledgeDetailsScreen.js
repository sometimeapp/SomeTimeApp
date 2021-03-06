// const pledge =     {
//   "pledgeStatus": "pending",
//   "promiseDate": "2019-05-30T22:12:38.125Z",
//   "promiseDueDate": "2019-07-15T22:12:38.125Z",
//   "promiseeFirstName": "Zach",
//   "promiseeId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
//   "promiseeLastName": "Daniels",
//   "promisorFirstName": "Jonathan",
//   "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
//   "promisorLastName": "Adler",
//   "terms": "a meal",
//   "screen": "PledgesMade"
// }

import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import { API } from 'aws-amplify';

import { Icon } from 'react-native-elements';
import moment from 'moment';

import { twoWayIconDict } from '../../constants/iconInfo';

import Layout from '../../constants/Layout';

import Colors from '../../constants/Colors';

// var buttonFontSize = 16;
// var iconSize = 100
// if (PixelRatio.get() <= 2) {
//   buttonFontSize = 12;
//   iconSize = 75;
// }

export default class PledgeDetailsScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Details',
    headerStyle: {
      backgroundColor: Colors.sometimeHeader
    },
    headerTintColor: Colors.sometimeSecondaryText
  };

  state = {
    deleting: false
  }

  statusColor = (pledgeStatus) => {
    switch (pledgeStatus) {
      case 'resolved':
        return Colors.sometimePrimary;
      case 'expired':
        return Colors.sometimeExpired;
      default:
        return Colors.sometimeSecondaryText;
    }
  }

  deletePledge = async () => {

    this.setState({ deleting: true });

    let apiName = 'PledgesCRUD';
    let path = '/pledges/object/' + this.props.navigation.state.params.promiseeId + '/' + this.props.navigation.state.params.promiseDate;
    let myInit = { // OPTIONAL
      headers: {}, // OPTIONAL
      response: true
    }
    API.del(apiName, path, myInit).then(response => {
      alert('Pledge successfully deleted!');
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }).catch(error => {
      console.log(JSON.stringify(error.response))
    });
  }

  render() {
    const pledge = this.props.navigation.state.params;

    return (
      <View style={styles.mainContainer}>

        <View style={styles.iconContainer}>
          <Icon
            name={twoWayIconDict.revGet(pledge.terms) || "asterisk"}
            type="material-community"
            size={Layout.largeIconSize}
            containerStyle={{ borderRadius: 10, padding: 15, backgroundColor: this.statusColor(pledge.pledgeStatus) }}
          />
        </View>

        <View style={styles.pledgeInfoContainer}>

          <View style={styles.container}>
            <View style={styles.pledgeRowContainer}>
              <View style={{ flex: 1, flexDirection: "row", }}><Text style={{ fontWeight: "bold" }}>Terms:</Text></View>
              <View style={{ flex: 1, flexDirection: "row", }}><Text>{pledge.terms}</Text></View>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.pledgeRowContainer}>
              <View style={{ flex: 1, flexDirection: "row", }}><Text style={{ fontWeight: "bold" }}>{pledge.screen === 'PledgesMade' ? 'Owed to:' : 'Owed by:'}</Text></View>
              <View style={{ flex: 1, flexDirection: "row", }}><Text>{pledge.screen === 'PledgesMade' ? `${pledge.promiseeFirstName} ${pledge.promiseeLastName}`
                : `${pledge.promisorFirstName} ${pledge.promisorLastName}`}</Text></View>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.pledgeRowContainer}>
              <View style={{ flex: 1, flexDirection: "row", }}><Text style={{ fontWeight: "bold" }}>Pledge made:</Text></View>
              <View style={{ flex: 1, flexDirection: "row", }}><Text>{moment(pledge.promiseDate).format('MMM Do YYYY')}</Text></View>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.pledgeRowContainer}>
              <View style={{ flex: 1, flexDirection: "row", }}><Text style={{ fontWeight: "bold" }}>Due:</Text></View>
              <View style={{ flex: 1, flexDirection: "row", }}><Text>{moment(pledge.promiseDueDate).format('MMM Do YYYY')}</Text></View>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.pledgeRowContainer}>
              <View style={{ flex: 1, flexDirection: "row", }}><Text style={{ fontWeight: "bold" }}>Status:</Text></View>
              <View style={{ flex: 1, flexDirection: "row", }}><Text>{pledge.pledgeStatus}</Text></View>
            </View>
          </View>

        </View>

        {(() => {
          if (pledge.screen === 'PledgesMade' && pledge.pledgeStatus === 'pending') {
            return (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: Colors.sometimeTertiary }}
                  onPress={() => this.props.navigation.navigate('ResolveQR', pledge)}>
                  <Text style={styles.buttonText}>Make Good</Text>
                </TouchableOpacity>
              </View>
            )
          } else if (pledge.screen === 'PledgesOwed' && pledge.pledgeStatus === 'expired') {
            return (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{ ...styles.button, backgroundColor: Colors.sometimeTertiary }}
                  disabled={this.state.deleting ? true : false}
                  onPress={() => this.deletePledge()}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )
          } else {
            return (
              <View style={styles.buttonContainer}>
              </View>
            )
          }
        })()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.sometimeBackground
  },
  container: {
    flex: 1,
  },
  iconContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "silver"
  },
  pledgeInfoContainer: {
    flex: 3,
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    backgroundColor: Colors.sometimeSecondaryText,
  },
  pledgeRowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //backgroundColor: "purple",
    paddingLeft: 30,
    paddingRight: 30,
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    height: Layout.buttonHeight,
    width: Layout.buttonWidth,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  buttonText: {
    fontSize: Layout.buttonFontSize,
    fontWeight: "bold"
  },
});
