import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../components/screens/SignInScreen';
import SignUpScreen from '../components/screens/SignUpScreen';
import ForgotPasswordScreen from '../components/screens/ForgotPasswordScreen';
import AuthLoadingScreen from '../components/screens/AuthLoadingScreen';
import ConfirmScreen from '../components/screens/ConfirmScreen';

/*
  This nav stack is specific to the all authentication paths
*/
const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  Confirm: ConfirmScreen,
  ForgotPassword: ForgotPasswordScreen
});

/* 
  This navigator allows only one page to be displayed at a time and suppresses the 'back' actions
  and resets routes to their default state when you switch away.
*/
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));