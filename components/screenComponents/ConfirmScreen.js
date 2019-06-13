import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import {
  Input,
} from 'react-native-elements'

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

// var buttonFontSize = 16;
// if (PixelRatio.get() <= 2) {
//   buttonFontSize = 12;
// }

const ConfirmSignUp = (props) => {

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: Colors.sometimeBackground }}>
      <View style={{
        alignItems: 'center',
        height: (Dimensions.get('window').height * .25),
        justifyContent: 'space-evenly'
      }}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Confirmation Code"
            keyboardType="numeric"
            returnKeyType="done"
            autoCorrect={false}
            containerStyle={{ width: Layout.inputWidth}}
            inputStyle={{ borderColor: 'gray', borderWidth: 2, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={value => props.onChangeText('authCode', value)}
          />
        </View>

        <View style={styles.confirmContainer}>
          <TouchableOpacity
            onPress={() => props.confirmSignUp()}
            style={{...styles.button, backgroundColor: Colors.sometimeTertiary}}
          >
            <Text style={styles.buttonText}>
              Confirm
          </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.resendContainer}>
          <TouchableOpacity
            onPress={() => props.resendSignUp()}
            style={styles.resendText}
          >
            <Text style={styles.buttonText}>
              Resend code
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    height: Layout.buttonHeight,
    width: Layout.buttonWidth,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    elevation: 2, // Android
  },
  buttonText: {
    fontSize: Layout.buttonFontSize,
    fontWeight: "bold"
  },
  resendText: {
    alignItems: 'center',
    justifyContent: "center",
    padding: 10,
    borderRadius: 10
  },
  // inputContainer: {
  //   flex: 6,
  //   backgroundColor: "lime", 
  //   alignItems: "center",
  //   justifyContent: "flex-end"
  // },
  // confirmContainer: {
  //   flex: 2,
  //   backgroundColor: "skyblue", 
  //   alignItems: "center",
  //   justifyContent: "center"
  // },
  // resendContainer: {
  //   flex: 8,
  //   backgroundColor: "silver", 
  //   alignItems: "center",
  // }
})

export default ConfirmSignUp