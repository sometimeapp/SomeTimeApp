import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import PledgeCard from '../screenComponents/PledgeCard'

const staticPromiseList = [
  {
    "pledgeStatus": "resolved",
    "promiseDate": "2019-05-08T20:41:40.020Z",
    "promiseeFirstName": "Zach",
    "promiseeId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
    "promiseeLastName": "Daniels",
    "promisorFirstName": "Jonathan",
    "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
    "promisorLastName": "Adler",
    "terms": "Hope",
  },
  {
    "pledgeStatus": "pending",
    "promiseDate": "2019-05-08T21:17:58.709Z",
    "promiseeFirstName": "Zach",
    "promiseeId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
    "promiseeLastName": "Daniels",
    "promisorFirstName": "Jonathan",
    "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
    "promisorLastName": "Adler",
    "terms": "This will work",
  },
  {
    "pledgeStatus": "pending",
    "promiseDate": "2019-05-09T23:06:13.491Z",
    "promiseDueDate": "2019-05-12T23:06:13.492Z",
    "promiseeFirstName": "Zach",
    "promiseeId": "bdd53477-fc16-4fa3-888a-2d22e1acea4d",
    "promiseeLastName": "Daniels",
    "promisorFirstName": "Jonathan",
    "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
    "promisorLastName": "Adler",
    "terms": "This will work or die",
  },
  {
    "pledgeStatus": "pending",
    "promiseDate": "2019-07-16T21:48:22.727Z",
    "promiseDueDate": "2019-07-16T21:48:22.727Z",
    "promiseeFirstName": "rusty",
    "promiseeId": "bc3b95c3-955d-41bc-9985-343478136233",
    "promiseeLastName": "shackleford",
    "promisorFirstName": "Jonathan",
    "promisorId": "679f22da-6818-4bfd-8a67-8a2b34168a8d",
    "promisorLastName": "Adler",
    "terms": "a coffee",
  },
]

export default class HomeScreen extends React.Component {
  state = {}

  static navigationOptions = {
    headerTitle: 'Home',
  };

  render() {
    return (
      <PledgeCard pledge={staticPromiseList[3]} />
    )
    
  }
}

//   render() {
//     console.log("rendering the home screen!")
//     return (
//       <View style={styles.container}>
//         <Text>Welcome to the Home screen</Text>
//         <View style={{ margin: 5 }}>
//           <Button
//             style={styles.button}
//             title="Make Promise"
//             onPress={() => this.props.navigation.navigate('Terms')}
//           />
//           </View>
//           <View style={{ margin: 5 }}>
//           <Button
//             style={styles.button}
//             title="Receive"
//             onPress={() => this.props.navigation.navigate('Receive')}
//           />
//         </View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     textAlign: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#ffffff',
//   }
// });
