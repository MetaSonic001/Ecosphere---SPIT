import { StyleSheet } from 'react-native';
//import { StackNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation';
import HomeStackNavigator from './HomeStackNavigator';
import HomeTabNavigator from './HomeTabNavigator';

export default createStackNavigator({
    HomeStackNavigator: {
    screen: HomeStackNavigator,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  HomeTabNavigator: {
    screen: HomeTabNavigator,
  },
},
  {
    initialRouteName: "HomeStackNavigator",
    headerMode: "none",
    mode: "modal",
    navigationOptions: {
      gesturesEnabled: false
    },

  })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});