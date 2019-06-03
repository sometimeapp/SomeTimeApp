const pledge =     {
  "pledgeStatus": "pending",
  "promiseDate": "2019-05-30T22:12:38.125Z",
  "promiseDueDate": "2019-07-15T22:12:38.125Z",
  "promiseeFirstName": "Zach",
  "promiseeId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
  "promiseeLastName": "Daniels",
  "promisorFirstName": "Jonathan",
  "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
  "promisorLastName": "Adler",
  "terms": "a meal",
  "screen": "PledgesMade"
}

import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import { Icon } from 'react-native-elements';
import moment from 'moment';

import { twoWayIconDict } from '../../constants/iconInfo';

import Layout from '../../constants/Layout';

import Colors from '../../constants/Colors';

var buttonFontSize = 16;
var iconSize = 100
if (PixelRatio.get() <= 2) {
  buttonFontSize = 12;
  iconSize = 75;
}

export default class PledgeDetailsScreen extends React.Component {

  static navigationOptions = {
    headerTitle: 'Details',
    headerStyle: {
      backgroundColor: Colors.sometimeHeader
    },
    headerTintColor: Colors.sometimeSecondaryText
  };

  render() {
    //const pledge = this.props.navigation.state.params;
    console.log(Layout.window.width)

    return (
      <View style={styles.mainContainer}>

        <View style={styles.iconContainer}>
          <Icon
            name={twoWayIconDict.revGet(pledge.terms) || "asterisk"}
            type="material-community"
            size={iconSize}
            containerStyle={{ borderRadius: 10, padding: 15, backgroundColor: "#FAFAFA" }}
          />
        </View>

        <View style={styles.pledgeInfoContainer}>

          <View style={styles.container}>
            <View style={styles.pledgeRowContainer}>
              <View style={{flex: 1, flexDirection: "row",  }}><Text style={{fontWeight: "bold"}}>Terms:</Text></View>
              <View style={{flex: 1, flexDirection: "row", }}><Text>{pledge.terms}</Text></View>
            </View>
          </View>

          <View style={styles.container}>
          <View style={styles.pledgeRowContainer}>
              <View style={{flex: 1, flexDirection: "row", }}><Text style={{fontWeight: "bold"}}>{pledge.screen === 'PledgesMade' ? 'Owed to:' : 'Owed by:'}</Text></View>
              <View style={{flex: 1, flexDirection: "row", }}><Text>{pledge.screen === 'PledgesMade' ? `${pledge.promiseeFirstName} ${pledge.promiseeLastName}`
                : `${pledge.promisorFirstName} ${pledge.promisorLastName}`}</Text></View>
            </View>
          </View>

          <View style={styles.container}>
          <View style={styles.pledgeRowContainer}>
              <View style={{flex: 1, flexDirection: "row", }}><Text style={{fontWeight: "bold"}}>Pledge made:</Text></View>
              <View style={{flex: 1, flexDirection: "row", }}><Text>{moment(pledge.promiseDate).format('MMM Do YYYY')}</Text></View>
            </View>
          </View>

          <View style={styles.container}>
          <View style={styles.pledgeRowContainer}>
              <View style={{flex: 1, flexDirection: "row", }}><Text style={{fontWeight: "bold"}}>Due:</Text></View>
              <View style={{flex: 1, flexDirection: "row", }}><Text>{moment(pledge.promiseDueDate).format('MMM Do YYYY')}</Text></View>
            </View>
          </View>

          <View style={styles.container}>
          <View style={styles.pledgeRowContainer}>
              <View style={{flex: 1, flexDirection: "row", }}><Text style={{fontWeight: "bold"}}>Status:</Text></View>
              <View style={{flex: 1, flexDirection: "row", }}><Text>{pledge.pledgeStatus}</Text></View>
            </View>
          </View>

        </View>

        <View style={styles.buttonContainer}>
          {pledge.screen === 'PledgesMade' && pledge.pledgeStatus !== 'resolved' ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('ResolveQR', pledge)}>
              <Text style={styles.buttonText}>Make Good</Text>
            </TouchableOpacity>
          ) : (null)
          }
        </View>

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
    borderWidth: 3,
    borderRadius: 10,
    margin: 10, 
    paddingTop: 10,
    backgroundColor: "#FAFAFA", 
  },
  pledgeRowContainer: {
    flex: 1, 
    flexDirection: "row", 
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
    backgroundColor: Colors.sometimeTertiary,
    padding: 10,
    height: (Layout.window.height / 15),
    width: (Layout.window.width / 3),
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  buttonText: {
    fontSize: buttonFontSize,
    fontWeight: "bold"
  },
});
