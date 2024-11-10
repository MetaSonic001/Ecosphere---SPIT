import React from 'react';
import { Image, StyleSheet } from 'react-native';
//import { Button, Icon } from 'react-native-elements';

import Onboarding from 'react-native-onboarding-swiper';
import HEALTH from '../assets/Health.jpg';
import CHEESEROAST from '../assets/cheeseroast.jpg';


const OnBoardingScreen = ({navigation}) => (
    <Onboarding
      onSkip={() =>navigation.navigate('HomeTabNavigator') }
      onDone={()  => navigation.navigate('HomeTabNavigator') }
      pages={[
        {
          backgroundColor: '#fff',
          title:'Bloom!!!',
          image: <Image source={HEALTH}  style={styles.logo}/>,
          subtitle: 'Know what is in your food.Our smart camera analyzes the ingredients! :)',
        },
        
        {
          textColor: 'red',
          title: 'Choose a Recipe',
          backgroundColor: '#fff',
          image: <Image source={CHEESEROAST} style={styles.logo}/>,
          subtitle: 'Capture your food. View full details about the nutritional information.',
          
        
        },
        
       
    ]}
  />
);
const styles = StyleSheet.create({
    logo: {
      resizeMode: 'contain',
      width: 250,
      height: 250,
      
    },
  });

  export default OnBoardingScreen;