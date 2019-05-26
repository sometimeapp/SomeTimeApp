import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  PixelRatio
} from 'react-native';

import {
  Input,
} from 'react-native-elements'

import Layout from '../../constants/Layout';

var buttonFontSize = 16;
if (PixelRatio.get() <= 2) {
  buttonFontSize = 12;
}

const ConfirmSignUp = (props) => {

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{
        alignItems: 'center',
        height: (Layout.window.height * .25),
        justifyContent: 'space-evenly'
      }}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Confirmation Code"
            keyboardType="numeric"
            returnKeyType="done"
            autoCorrect={false}
            containerStyle={{ width: (Layout.window.width * .95) }}
            inputStyle={{ borderColor: 'gray', borderWidth: 1, borderRadius: 5, padding: 5 }}
            inputContainerStyle={{ borderBottomWidth: 0 }}
            onChangeText={value => props.onChangeText('authCode', value)}
          />
        </View>

        <View style={styles.confirmContainer}>
          <TouchableOpacity
            onPress={() => props.confirmSignUp()}
            style={styles.button}
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
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: (Layout.window.height / 15),
    width: (Layout.window.width / 3),
    borderRadius: 10
  },
  buttonText: {
    fontSize: buttonFontSize,
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