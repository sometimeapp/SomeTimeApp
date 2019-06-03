// const PROMISE = {
//   "pledgeStatus": "pending",
//   "promiseDate": "2019-05-15T21:27:18.723Z",
//   "promiseDueDate": "2019-06-14T21:27:18.723Z",
//   "promiseeFirstName": "Jonathan",
//   "promiseeId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
//   "promiseeLastName": "Adler",
//   "promisorFirstName": "Zach",
//   "promisorId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
//   "promisorLastName": "Daniels",
//   "screen": "made",
//   "terms": "a ride from here to there"
// }

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio,
  ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Auth, API } from 'aws-amplify';
import moment from 'moment';
import { twoWayIconDict } from '../../constants/iconInfo';

var smallFontSize = 12;
if (PixelRatio.get() <= 2) {
  smallFontSize = 10;
}

var largeFontSize = 21
if (PixelRatio.get() <= 2) {
  largeFontSize = 16;
}

var buttonFontSize = 16;
if (PixelRatio.get() <= 2) {
  buttonFontSize = 12;
}

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export default class ResolveReviewScreen extends React.Component {

  state = {
    apiResponse: null,
    sending: false
  }

  static navigationOptions = {
    headerTitle: 'Resolution Review',
    headerStyle: {
      backgroundColor: Colors.sometimeHeader
    },
    headerTintColor: Colors.sometimeSecondaryText
  };

  async componentDidMount() {
    let userInfo = await this.getId();
    this.setState({
      promiseeID: userInfo.userID,
      promiseeFirstName: userInfo.firstName,
      promiseeLastName: userInfo.lastName,
    });
  }

  updatePledgeStatus = async () => {
    this.setState({ sending: true });

    let apiName = 'PledgesCRUD';
    let path = '/pledges';
    let myInit = {
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      body: {
        "promiseeId": this.props.navigation.getParam('promiseeId'),
        "promisorId": this.props.navigation.getParam('promisorId'),
        "promiseDate": this.props.navigation.getParam('promiseDate'),
        "promiseDueDate": this.props.navigation.getParam('promiseDueDate'),
        "pledgeStatus": 'resolved',
        "promiseeFirstName": this.props.navigation.getParam('promiseeFirstName'),
        "promiseeLastName": this.props.navigation.getParam('promiseeLastName'),
        "promisorFirstName": this.props.navigation.getParam('promisorFirstName'),
        "promisorLastName": this.props.navigation.getParam('promisorLastName'),
        "terms": this.props.navigation.getParam('terms'),
      }
    }

    API.put(apiName, path, myInit).then(response => {
      alert('Pledge successfully resolved!');
      this.props.navigation.navigate('Pledges');
    }).catch(error => {
      console.log(JSON.stringify(error.response))
    });
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
    const promisorFirstName = this.props.navigation.getParam('promisorFirstName');
    const promisorLastName = this.props.navigation.getParam('promisorLastName');
    const terms = this.props.navigation.getParam('terms');
    const date = moment(this.props.navigation.getParam('promiseDate')).format('MMM Do YYYY');
    const dueDate = moment(this.props.navigation.getParam('promiseDueDate')).format('MMM Do YYYY');
    const { promiseeFirstName } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>

            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
              <Icon
                name={twoWayIconDict.revGet(terms) || "asterisk"}
                type="material-community"
                size={85}
              />
            </View>

            <View style={{ flex: 3 }}>
              <View style={{ flex: 1, flexDirection: "row", margin: 10, borderWidth: 3, borderRadius: 10, backgroundColor: Colors.sometimeSecondaryText }}>
                <View style={{ flex: 1, padding: 5, justifyContent: "space-between" }}>
                  <Text style={{ fontSize: smallFontSize }}>Terms:</Text>
                  <Text style={{ fontSize: smallFontSize }}>Date:</Text>
                  <Text style={{ fontSize: smallFontSize }}>Due Date:</Text>
                </View>
                <View style={{ flex: 2, padding: 5, justifyContent: "space-between" }}>
                  <Text style={{ fontSize: smallFontSize }}>{terms.length <= 13 ? terms : terms.substring(0, 13) + "..."}</Text>
                  <Text style={{ fontSize: smallFontSize }}>{date}</Text>
                  <Text style={{ fontSize: smallFontSize }}>{dueDate}</Text>
                </View>
              </View>
            </View>

          </View>

        </View>

        <View style={{ flex: 2 }}>

          <View style={{ flex: 1, backgroundColor: Colors.sometimeSecondaryText, borderWidth: 3, borderRadius: 10, margin: 20, padding: 8 }}>
            <Text style={{ fontSize: largeFontSize, fontStyle: "italic" }}>
              {`Hey, ${promiseeFirstName}!  Remember that time I promised you ${terms}?  I've paid my debt!  So, we're good now, right?

Sincerely, 
${promisorFirstName} ${promisorLastName}`}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>

          {
            !this.state.sending ? (
              <View style={styles.buttonRowContainer}>
                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: Colors.sometimeSecondary }}
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Nope!</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: Colors.sometimeTertiary }}
                    disabled={this.state.sending ? true : false}
                    onPress={() => this.updatePledgeStatus()}>
                    <Text style={styles.buttonText}>Yes!</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                  <ActivityIndicator size="large" />
                </View>
              )
          }
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.sometimeBackground
  },
  buttonRowContainer: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center"
  },
  buttonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
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