import React from 'react';
import { Platform } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from 'react-navigation';

import CameraNavigator from './CameraNavigator';
//import SavedRecipeNavigator from './SavedRecipeNavigator';


const HomeTabNavigator = createBottomTabNavigator({
  CameraTab: {
    screen: CameraNavigator,
    navigationOptions: {
      tabBarLabel: 'CAMERA',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name='camera'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      )
    }
  },
 /* SavedTab: {
    screen: SavedRecipeNavigator,
    navigationOptions: {
      tabBarLabel: 'MY RECIPES',
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          name='menu'
          color={tintColor}
          size={Platform.OS === 'ios' ? 22 : 25}
        />
      ),
    }
  }*/
}, {
    initialRouteName: 'CameraTab',
    tabBarPosition: 'bottom',
    animationEnabled: Platform.OS === 'ios' ? false : true,
    swipeEnabled: Platform.OS === 'ios' ? false : false,
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      activeTintColor: '#1EA2DB',
      inactiveTintColor: '#999999',
      style: {
        backgroundColor: '#ffffff',
        padding: Platform.OS === 'ios' ? 5 : 0,
      },
      indicatorStyle: {
        backgroundColor: 'white'
      },
      labelStyle: {
        fontSize: 12
      }
    }
  });

export default HomeTabNavigator;