import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import Amplify from 'aws-amplify'
import awsmobile from './aws-exports'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
Amplify.configure(awsmobile)

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return await Promise.all([
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'ultra': require('./assets/fonts/Ultra-Regular.ttf'),
        ...MaterialCommunityIcons.font,
        'fontawesome-free': require('./assets/fonts/fa-solid-900.ttf')
      }),
      Expo.Asset.fromModule(require('./assets/images/handshakeSmall-transparent.png')).downloadAsync()
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
