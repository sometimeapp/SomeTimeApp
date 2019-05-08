import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native';

export default class PledgeDetailsScreen extends React.Component {

  static navigationOptions = {
    title: '',
  };


  render() {
    const pledge = this.props.navigation.state.params;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Text>Welcome to the Pledge Details Screen</Text>
        <Text>Terms: {pledge.terms}</Text>
        <Text>{pledge.screen === 'made' ? `Owed to: ${pledge.promiseeFirstName} ${pledge.promiseeLastName}`
          : `Made by: ${pledge.promisorFirstName} ${pledge.promisorLastName}`}
        </Text>
        <Text>Date: {pledge.promiseDate}</Text>
        <Text>Terms: {pledge.pledgeStatus}</Text>
        { pledge.screen === 'owed' ? (
          <View style={{ margin: 5 }}>
          <Button
            style={styles.button}
            title="Resolve"
            onPress={() => this.props.navigation.navigate('ResolveQR', pledge)}
          />
        </View>
        ) : (null) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#fff',
  }
});
