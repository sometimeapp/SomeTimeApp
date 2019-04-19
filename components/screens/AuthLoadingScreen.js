import React from 'react';

import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    userToken: null
  }

   async componentDidMount() {
     await this.loadApp();
   }

    // Fetch the token from storage then navigate to our appropriate place
    loadApp = async () => {
      console.log("I am loading")
      await Auth.currentAuthenticatedUser()
      .then(user => {
      this.setState({userToken:
        user.signInUserSession.accessToken.jwtToken})
    })
    .catch(err => console.log(err))
    this.props.navigation.navigate(this.state.userToken ? 'Main' : 'Auth')
  };

  render() {
    console.log("I am rendering the Auth Loading Screen!")
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aa73b7',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

// import React from 'react';
// import {
//   ActivityIndicator,
//   AsyncStorage,
//   StatusBar,
//   StyleSheet,
//   View,
// } from 'react-native';

// export default class AuthLoadingScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this._bootstrapAsync();
//   }

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem('userToken');

//     // This will switch to the Main screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View>
//        <ActivityIndicator size="large" color="#fff" />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }