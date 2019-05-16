const PROMISE =  {
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
  "terms": "a meal"
}

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Auth, API } from 'aws-amplify';
import moment from 'moment';

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

  savePledge = async () => {

    this.setState({sending: true});

    let apiName = 'PledgesCRUD'; 
    let path = '/pledges'; 
    let myInit = {
      response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
      body: {
        "promiseeId": this.state.promiseeID,
        "promiseeFirstName": this.state.promiseeFirstName,
        "promiseeLastName": this.state.promiseeLastName,
        "promiseDate": this.props.navigation.getParam('date'),
        "promiseDueDate": this.props.navigation.getParam('dueDate'),
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

    // const promisorFirstName = this.props.navigation.getParam('promisorFirstName');
    // const terms = this.props.navigation.getParam('terms');
    // const date = moment(this.props.navigation.getParam('date')).format('DD-MM-YYYY');
    // const dueDate = moment(this.props.navigation.getParam('dueDate')).format('DD-MM-YYYY');
    // const { promiseeFirstName, promiseeLastName } = this.state;

    const promisorFirstName = PROMISE['promisorFirstName'];
    const promisorLastName = PROMISE['promisorLastName'];
    const terms = PROMISE['terms'];
    const date = moment(PROMISE['promiseDate']).format('MMM Do YYYY');
    const dueDate = moment(PROMISE['promiseDueDate']).format('MMM Do YYYY');
    const { promiseeFirstName, promiseeLastName } = this.state;

    return (
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, flexDirection: "row"}}>

            <View style={{flex: 2, justifyContent: "center", alignItems: "center"}}>
              <Icon
              name="coffee"
              type="font-awesome"
              size={75}              
              />
            </View>

            <View style={{flex: 3}}>
              <View style={{flex: 1, flexDirection: "row", margin: 10, borderWidth: 3, borderRadius: 10}}>
                <View style={{flex: 1, padding: 5, justifyContent: "space-between"}}>
                  <Text>Terms:</Text>
                  <Text>Date:</Text>
                  <Text>Due Date:</Text>
                </View>
                <View style={{flex: 2, padding: 5, justifyContent: "space-between"}}>
                  <Text>{terms}</Text>
                  <Text>{date}</Text>
                  <Text>{dueDate}</Text>
                </View>
              </View>
            </View>        
          
          </View>          
        
        </View>

        <View style={{flex: 2}}>
          
          <View style={{flex: 1, backgroundColor: "white", borderWidth: 3, borderRadius: 10, margin: 20, padding: 8}}>
            <Text style={{fontSize: 25, fontStyle: "italic"}}>
            {`I hereby acknowledge that I owe ${promiseeFirstName} ${promiseeLastName} the favor of ${terms}, and that I shall repay this debt on or before ${date}.

Sincerely, 
${promisorFirstName} ${promisorLastName}`}
            </Text>
          </View>
        </View>


        <View style={{flex: 1}}>


          <View style={styles.buttonRowContainer}>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this._signInAsync()}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonView}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
      

        </View>
      </View>
    )

    // return (

    //   <View style={styles.container}>
    //     <Text>{this.props.navigation.getParam('promisorID')}</Text>
    //     <Text>{this.props.navigation.getParam('promisorFirstName')}</Text>
    //     <Text>{this.props.navigation.getParam('promisorLastName')}</Text>
    //     <Text>{this.state.promiseeID}</Text>
    //     <Text>{this.props.navigation.getParam('pledgeStatus')}</Text>
    //     <Text>{this.props.navigation.getParam('terms')}</Text>
    //     <Text>{this.props.navigation.getParam('date')}</Text>
    //     <Text>{this.props.navigation.getParam('dueDate')}</Text>

    //     <View style={{ margin: 5 }}>
    //     {
    //       !this.state.sending ? (
    //         <Button
    //         onPress={() => alert("You've accepted")}
    //         title="Accept"
    //         onPress={() => this.savePledge()}
    //       />
    //       ) : (
    //         <ActivityIndicator />
    //       )
    //     }
    //       </View>
    //       <View style={{ margin: 5 }}>
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