import React from 'react';

import {
  ActivityIndicator,
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
        this.setState({
          userToken:
            user.signInUserSession.accessToken.jwtToken
        })
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});