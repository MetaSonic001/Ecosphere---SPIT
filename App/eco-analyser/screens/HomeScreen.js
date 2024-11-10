import React from 'react';
import { StyleSheet } from 'react-native';
import OnBoardingScreen from '../screens/OnBoardingScreen';

  export default class Screen extends React.Component {
    static navigationOptions = {
      header: null,
    };
    render() {
      return (
        <OnBoardingScreen navigation={this.props.navigation}/> 
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });