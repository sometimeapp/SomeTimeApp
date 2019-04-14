import React from 'react';
import {
    StyleSheet,
    View,
    Text,
  } from 'react-native';

  export default class SignUpScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Text>Sign Up Screen!</Text>
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