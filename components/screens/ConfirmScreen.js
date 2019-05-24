import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ScrollView
} from 'react-native';

// AWS Amplify
import Auth from '@aws-amplify/auth'

import {
  Input,
} from 'react-native-elements'

export default class ConfirmScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Confirm Account',
  };

  render() {
      return (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Text>Confirm!!!</Text>
    </View>
      )
  }

}