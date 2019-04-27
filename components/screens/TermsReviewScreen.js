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

      <View style={styles.container}>
        <Text>{this.props.navigation.getParam('promisorID')}</Text>
        <Text>{this.props.navigation.getParam('promisorFirstName')}</Text>
        <Text>{this.props.navigation.getParam('promisorLastName')}</Text>
        <Text>{this.props.navigation.getParam('promiseeID')}</Text>
        <Text>{this.props.navigation.getParam('status')}</Text>
        <Text>{this.props.navigation.getParam('terms')}</Text>
        <Text>{this.props.navigation.getParam('date')}</Text>

        <View style={{ margin: 5 }}>
          <Button
            title="Accept"
            //onPress={() => this.props.navigation.navigate('QR')}
            onPress={() => alert("You've accepted")}
          />
          </View>
          <View style={{ margin: 5 }}>
          <Button
            style={styles.button}
            title="Reject"
            onPress={() => this.props.navigation.navigate('Home')}
          />
        </View>
      </View>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }
});