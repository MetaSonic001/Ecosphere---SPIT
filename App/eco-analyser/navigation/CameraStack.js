import { createStackNavigator } from 'react-navigation';

import NutritionResultsScreen from '../screens/NutritionResultsScreen';
import ResultScreen from '../screens/ResultScreen';
import TakePhoto from '../screens/TakePhoto';
//import { F_OK } from 'constants';
import FoodListScreen from '../screens/FoodListScreen';
const CameraStack = createStackNavigator({
  Camera: {
    screen: TakePhoto,
  },
  RecognitionResult: {
    screen: ResultScreen,
  },
  FoodListScreen:{
    screen:FoodListScreen,
  },
  NutritionResultsScreen: {
    screen: NutritionResultsScreen,
  },
  
},
  {
    initialRouteName: 'Camera',
  }
);
export default CameraStack;