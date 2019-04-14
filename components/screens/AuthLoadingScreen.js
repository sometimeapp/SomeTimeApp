import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    //this._bootstrapAsync();
  }

  async componentDidMount() {
    await this._bootstrapAsync();
  }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
  
      // This will switch to the Main screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'Main' : 'Auth');
    };

  render() {
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