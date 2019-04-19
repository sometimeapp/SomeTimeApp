import React from 'react';
import { Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
  SafeAreaView,
  Button
} from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Item,
} from 'native-base'

export default class HomeScreen extends React.Component {
  state = {
    loadingFonts: true
  }
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ loadingFonts: false });
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    console.log("signed out!")
  };

  render() {
    console.log("rendering the home screen!")
    if (this.state.loadingFonts) {
      return (
        <Text>Hang on a sec...</Text>
      )
    } else {
      return (
          <View style={styles.container}>
            <Text>Welcome to the Home screen</Text>
            <Button
            style={styles.button}
            title="Make Promise"
            onPress={ () => console.log("clicked 'Make'")} 
            />
            <Button
            style={styles.button}
            title="Receive"
            onPress={ () => console.log("clicked 'Receive'")}  
            />
          </View>
      );
    }
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  }, 
  button: {
    padding: 20
  }
});
