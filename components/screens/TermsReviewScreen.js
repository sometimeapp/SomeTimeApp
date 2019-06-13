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
//   "terms": "a coffee, but also something much longer and more involved"
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

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export default class TermsReviewScreen extends React.Component {

  state = {
    promiseeID: '',
    promiseeFirstName: '',
    promiseeLastName: '',
    apiResponse: null,
    sending: false
  }

  static navigationOptions = {
    headerTitle: 'Review Terms',
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

  savePledge = async () => {

    this.setState({ sending: true });

    let apiName = 'PledgesCRUD';
    let path = '/pledges';
    let myInit = {
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      body: {
        "promiseeId": this.state.promiseeID,
        "promiseeFirstName": this.state.promiseeFirstName,
        "promiseeLastName": this.state.promiseeLastName,
        "promiseDate": this.props.navigation.getParam('promiseDate'),
        "promiseDueDate": this.props.navigation.getParam('promiseDueDate'),
        "promisorId": this.props.navigation.getParam('promisorID'),
        "promisorFirstName": this.props.navigation.getParam('promisorFirstName'),
        "promisorLastName": this.props.navigation.getParam('promisorLastName'),
        "pledgeStatus": 'pending',
        "terms": this.props.navigation.getParam('terms')
      }
    }

    API.post(apiName, path, myInit).then(response => {
      alert('Pledge successfully made!');
      this.props.navigation.navigate('Home');
    }).catch(error => {
      console.log(JSON.stringify(error.response))
    });
  }

  render() {

    const promisorFirstName = this.props.navigation.getParam('promisorFirstName');
    const promisorLastName = this.props.navigation.getParam('promisorLastName');
    const terms = this.props.navigation.getParam('terms');
    const date = moment(this.props.navigation.getParam('promiseDate')).format('MMM Do YYYY');
    const dueDate = moment(this.props.navigation.getParam('promiseDueDate')).format('MMM Do YYYY');
    const { promiseeFirstName, promiseeLastName } = this.state;

    // const promisorFirstName = PROMISE['promisorFirstName'];
    // const promisorLastName = PROMISE['promisorLastName'];
    // const terms = PROMISE['terms'];
    // const date = moment(PROMISE['promiseDate']).format('MMM Do YYYY');
    // const dueDate = moment(PROMISE['promiseDueDate']).format('MMM Do YYYY');
    // const { promiseeFirstName, promiseeLastName } = this.state;

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
            <View style={styles.miniBoxInfoContainer}>
              <View style={styles.miniBoxContainer}>
                <View style={styles.miniBoxRowContainer}>
                  <View style={{ flex: 1, flexDirection: "row", }}>
                    <Text style={{ fontWeight: "bold" }}>Terms:</Text></View>
                  <View style={{ flex: 1, flexDirection: "row", }}>
                    <Text style={{ fontSize: Layout.smallFontSize }}>{terms.length <= 13 ? terms : terms.substring(0, 15) + "..."}</Text></View>
                </View>
              </View>

              <View style={styles.miniBoxContainer}>
                <View style={styles.miniBoxRowContainer}>
                  <View style={{ flex: 1, flexDirection: "row", }}>
                    <Text style={{ fontWeight: "bold" }}>Date:</Text></View>
                  <View style={{ flex: 1, flexDirection: "row", }}>
                    <Text style={{ fontSize: Layout.smallFontSize }}>{date}</Text></View>
                </View>
              </View>

              <View style={styles.miniBoxContainer}>
                <View style={styles.miniBoxRowContainer}>
                  <View style={{ flex: 1, flexDirection: "row", }}><Text style={{ fontWeight: "bold" }}>Due Date:</Text></View>
                  <View style={{ flex: 1, flexDirection: "row", }}><Text style={{ fontSize: Layout.smallFontSize }}>{dueDate}</Text></View>
                </View>
              </View>
            </View>

            {/* <View style={{ flex: 3 }}>
              <View style={{ flex: 1, flexDirection: "row", margin: 10, borderWidth: 2, borderRadius: 10, backgroundColor: Colors.sometimeSecondaryText }}>
                <View style={{ flex: 1, padding: 5, justifyContent: "space-between" }}>
                  <Text style={{ fontSize: Layout.smallFontSize }}>Terms:</Text>
                  <Text style={{ fontSize: Layout.smallFontSize }}>Date:</Text>
                  <Text style={{ fontSize: Layout.smallFontSize }}>Due Date:</Text>
                </View>
                <View style={{ flex: 2, padding: 5, justifyContent: "space-between" }}>
                  <Text style={{ fontSize: Layout.smallFontSize }}>{terms.length <= 13 ? terms : terms.substring(0, 50) + "..."}</Text>
                  <Text style={{ fontSize: Layout.smallFontSize }}>{date}</Text>
                  <Text style={{ fontSize: Layout.smallFontSize }}>{dueDate}</Text>
                </View>
              </View>
            </View> */}

          </View>

        </View>

        <View style={{ flex: 2 }}>

          <View style={{
            flex: 1,
            backgroundColor: Colors.sometimeSecondaryText,
            borderWidth: 2,
            borderRadius: 10,
            marginLeft: Layout.reviewSideMargin,
            marginRight: Layout.reviewSideMargin,
            padding: Layout.reviewTermsPadding,
          }}>
            <Text style={{ fontSize: Layout.largeFontSize, fontStyle: "italic" }}>
              {`I hereby acknowledge that I owe ${promiseeFirstName} ${promiseeLastName} the favor of ${terms}, and that I shall repay this debt on or before ${date}.

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
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={{ ...styles.button, backgroundColor: Colors.sometimeTertiary }}
                    disabled={this.state.sending ? true : false}
                    onPress={() => this.savePledge()}>
                    <Text style={styles.buttonText}>Accept</Text>
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
  miniBoxInfoContainer: {
    flex: 3,
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    backgroundColor: Colors.sometimeSecondaryText,
  },
  miniBoxContainer: {
    flex: 1,
  },
  miniBoxRowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10
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