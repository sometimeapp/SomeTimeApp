import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../components/screens/HomeScreen';
import PledgesMadeScreen from '../components/screens/PledgesMadeScreen';
import SettingsScreen from '../components/screens/SettingsScreen';
import QRScannerScreen from '../components/screens/QRScannerScreen';
import GeneratedQRCodeScreen from '../components/screens/GeneratedQRCodeScreen';
import TermsReviewScreen from '../components/screens/TermsReviewScreen';
import PledgesOwedScreen from '../components/screens/PledgesOwedScreen';
import DefineTermsScreen from '../components/screens/DefineTermsScreen';
import PledgeDetailsScreen from '../components/screens/PledgeDetailsScreen';
import ResolveReviewScreeen from '../components/screens/ResolveReviewScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Receive: QRScannerScreen,
  MakeQR: GeneratedQRCodeScreen,
  Review: TermsReviewScreen,
  Terms: DefineTermsScreen,
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={
          Platform.OS === 'ios'
            ? `ios-information-circle${focused ? '' : '-outline'}`
            : 'md-information-circle'
        }
      />
    ),
  };
};

const PledgesTab = createMaterialTopTabNavigator({
  PledgesMade: PledgesMadeScreen,
  PledgesOwed: PledgesOwedScreen
})

PledgesTab.navigationOptions = {
  title: 'Pledges'
}

const PledgesStack = createStackNavigator({
  Pledges: PledgesTab,
  Details: PledgeDetailsScreen,
  ResolveQR: GeneratedQRCodeScreen, 
  ResolveReview: ResolveReviewScreeen
})

PledgesStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible,
    tabBarLabel: 'Pledges',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      />
    ),
  };
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  PledgesStack,
  SettingsStack,
});
