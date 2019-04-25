import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { Auth } from 'aws-amplify';

export default class TermsReviewScreen extends React.Component {


  /*
            promiserID: '67890876567890ghjklkjhgfyui',
            promiseeID: '567890987656789ghjkljhghjfd',
            status: 'pending',
            terms: 'Beer',
            date: new Date()
        }
  */

  render() {

    return (

      <View>
        <Text>{this.props.navigation.getParam('promiserID')}</Text>
        <Text>{this.props.navigation.getParam('promiseeID')}</Text>
        <Text>{this.props.navigation.getParam('status')}</Text>
        <Text>{this.props.navigation.getParam('terms')}</Text>
        <Text>{this.props.navigation.getParam('date')}</Text>
      </View>
    )

  }
}