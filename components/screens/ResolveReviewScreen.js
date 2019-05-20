const PROMISE = {
  "pledgeStatus": "pending",
  "promiseDate": "2019-05-15T21:27:18.723Z",
  "promiseDueDate": "2019-06-14T21:27:18.723Z",
  "promiseeFirstName": "Jonathan",
  "promiseeId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
  "promiseeLastName": "Adler",
  "promisorFirstName": "Zach",
  "promisorId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
  "promisorLastName": "Daniels",
  "screen": "made",
  "terms": "a ride from here to there"
}

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

var smallFontSize = 12;
if (PixelRatio.get() <= 2) {
  smallFontSize = 10;
}

var largeFontSize = 21
if (PixelRatio.get() <= 2) {
  largeFontSize = 16;
}

export default class ResolveReviewScreen extends React.Component {

  state = {
    apiResponse: null,
    sending: false
  }

  static navigationOptions = {
    headerTitle: 'Resolution Review',
  };

  async componentDidMount() {
    let userInfo = await this.getId();
    this.setState({
      promiseeID: userInfo.userID,
      promiseeFirstName: userInfo.firstName,
      promiseeLastName: userInfo.lastName,
    });
    //console.log('I should have been bound by now ' + this.state.promisorID)
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
      //console.log(user);
      return userInfo;
    } catch (error) {
      console.log(error);
    }
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>

            <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
              <Icon
                name="coffee"
                type="font-awesome"
                size={75}
              />
            </View>

            <View style={{ flex: 3 }}>
              <View style={{ flex: 1, flexDirection: "row", margin: 10, borderWidth: 3, borderRadius: 10 }}>
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

          <View style={{ flex: 1, backgroundColor: "white", borderWidth: 3, borderRadius: 10, margin: 20, padding: 8 }}>
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
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>Reject</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.buttonView}>
                  <TouchableOpacity
                    style={styles.button}
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

    // return (

    //   <View style={styles.container}>
    //     <Text>{this.props.navigation.getParam('promisorId')}</Text>
    //     <Text>{this.props.navigation.getParam('promisorFirstName')}</Text>
    //     <Text>{this.props.navigation.getParam('promisorLastName')}</Text>
    //     <Text>{this.props.navigation.getParam('pledgeStatus')}</Text>
    //     <Text>{this.props.navigation.getParam('terms')}</Text>
    //     <Text>{this.props.navigation.getParam('date')}</Text>
    //     <Text>{this.props.navigation.getParam('dueDate')}</Text>

    //     <View style={{ margin: 5 }}>
    //       {
    //         !this.state.sending ? (
    //           <Button
    //             onPress={() => alert("Pledge Resolved!")}
    //             title="Resolve"
    //             onPress={() => this.updatePledgeStatus()}
    //           />
    //         ) : (
    //             <ActivityIndicator />
    //           )
    //       }
    //     </View>
    //     <View style={{ margin: 5 }}>
    //       <Button
    //         disabled={this.state.sending ? true : false}
    //         title="Reject"
    //         onPress={() => this.props.navigation.navigate('Home')}
    //       />
    //     </View>
    //   </View>
    // )

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: "30%",
    width: "66%",
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    //backgroundColor: '#fff',
    elevation: 10, // Android
    //height: 50,
    //width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontWeight: "bold"
  },

});