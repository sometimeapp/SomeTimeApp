import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native';

import { Icon } from 'react-native-elements';
import moment from 'moment';

export default class PledgeDetailsScreen extends React.Component {

  static navigationOptions = {
    title: '',
  };


  render() {
    const pledge = this.props.navigation.state.params;
    console.log(this.props);

    return (
      <View style={styles.container}>

        <View style={styles.iconContainer}>
          <Icon
            name="coffee"
            type="font-awesome"
            size={100}
            containerStyle={{borderWidth: 3, padding: 5}}
          />
        </View>


        <View style={styles.pledgeInfoContainer}>
          
          <View style={styles.pledgeHeadingsContainer}>
            <Text>Pledge Headings go here</Text>
          </View>

          <View style={styles.pledgeDetailsContainer}>
            <Text>Pledge Details go here</Text>
          </View>

        </View>

        <View style={styles.buttonContainer}>
          <Text>Button goes here</Text>
        </View>

      </View>
    )
    // return (
    //   <View style={styles.container}>
    //     <Text>Welcome to the Pledge Details Screen</Text>
    //     <Text>Terms: {pledge.terms}</Text>
    //     <Text>{pledge.screen === 'made' ? `Owed to: ${pledge.promiseeFirstName} ${pledge.promiseeLastName}`
    //       : `Made by: ${pledge.promisorFirstName} ${pledge.promisorLastName}`}
    //     </Text>
    //     <Text>Date: {pledge.promiseDate}</Text>
    //     <Text>Due Date: {pledge.promiseDueDate}</Text>
    //     <Text>Terms: {pledge.pledgeStatus}</Text>
    //     { pledge.screen === 'made' ? (
    //       <View style={{ margin: 5 }}>
    //       <Button
    //         style={styles.button}
    //         title="Resolve"
    //         onPress={() => this.props.navigation.navigate('ResolveQR', pledge)}
    //       />
    //     </View>
    //     ) : (null) }
    //   </View>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  pledgeInfoContainer: {
    flex: 1,    
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow"
  },
  pledgeHeadingsContainer: {
    flex: 1,
    backgroundColor: "lime"
  },
  pledgeDetailsContainer: {
    flex: 1,
    backgroundColor: "blue"
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center", 
    backgroundColor: "pink"
  }

});
