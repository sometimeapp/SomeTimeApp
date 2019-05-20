import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native';

import { Icon } from 'react-native-elements';
import moment from 'moment';

import { iconDict, twoWayIconDict } from '../../constants/iconInfo';

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
            name={twoWayIconDict.revGet(pledge.terms) || "asterisk"}
            type="font-awesome"
            size={100}
            containerStyle={{ borderWidth: 3, padding: 5 }}
          />
        </View>


        <View style={styles.pledgeInfoContainer}>

          <View style={{ flex: 1, flexDirection: "row" }}>
            
            <View style={styles.pledgeHeadingsContainer}>
              <Text style={{fontWeight: "bold"}}>Terms:</Text>
              <Text style={{fontWeight: "bold"}}>Owed to:</Text>
              <Text style={{fontWeight: "bold"}}>Pledge made:</Text>
              <Text style={{fontWeight: "bold"}}>Due:</Text>
              <Text style={{fontWeight: "bold"}}>Status:</Text>
            </View>

            <View style={styles.pledgeDetailsContainer}>
              <Text>{pledge.terms}</Text>
              <Text>{pledge.screen === 'made' ? `${pledge.promiseeFirstName} ${pledge.promiseeLastName}`
                    : `${pledge.promisorFirstName} ${pledge.promisorLastName}`}
              </Text>
              <Text>{moment(pledge.promiseDate).format('DD-MMM-YYYY hh:mm A')}</Text>
              <Text>{moment(pledge.promiseDueDate).format('DD-MMM-YYYY hh:mm A')}</Text>
              <Text>{pledge.pledgeStatus}</Text>
            </View>

          </View>

        </View>

        <View style={styles.buttonContainer}>
          {pledge.screen === 'made' && pledge.pledgeStatus !== 'resolved' ? (
            <TouchableOpacity
                style={styles.button}
                onPress={ () => this.props.navigation.navigate('ResolveQR', pledge) }>
                <Text style={styles.buttonText}>Make Good</Text>
              </TouchableOpacity>
          ) : (null)
          }
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "yellow"
  },
  pledgeHeadingsContainer: {
    flex: 4,
    flexDirection: "column",
    //backgroundColor: "lime",
    justifyContent: "space-between",
    marginLeft: 15,
  },
  pledgeDetailsContainer: {
    flex: 6,
    //backgroundColor: "skyblue", 
    justifyContent: "space-between",
    marginRight: 15
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "pink"
  },
  button: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: "20%",
    width: "40%",
    borderRadius: 10
  },
  buttonText: {
    fontWeight: "bold"
  },

});
