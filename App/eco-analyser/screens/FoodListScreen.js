import { LinearGradient } from 'expo';
import React from 'react';
import Carousel, {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    SearchBar,
    StyleSheet,
    View
} from 'react-native';
//import FavSlide from '../components/FavSlide';
//import API_KEYS from '../utils/config_keys';



const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

const sliderWidth = viewportWidth;
const itemWidth = slideWidth + itemHorizontalMargin * 2;

let search = ''
export default class FoodListScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Food List',
    headerTintColor: '#2F80ED',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    headerStyle: { backgroundColor: '#DAE2F8', borderBottomWidth: 0.5, borderBottomColor: '#aaaaaa', },
  });
  constructor(props) {
    super(props)
    const ingredientsList = props.navigation.state.params && props.navigation.state.params.ingredientsList
    console.log("Correct ingredientsList: ", ingredientsList)
    this.state = {
      imagesLoaded: false,
      foodImages: null,
      API_URL: 'https://api.nutritionix.com',
      RES_SEARCH_URL: '/v1_1/search?',
      APP_ID:"95f7c961",
      RES_SEARCH_URL1: '&_app_key=',
      API_KEY: "77e69981e751d6bb5619fbd7b083e1ea",
      // search: null,
      allowedIngredient: ingredientsList || null,
      picture: '&requirePictures=true',
      isLoading: false,

    };
  }
  componentWillMount() {
    //When the component is loaded
    this._getYummlyImages()

  }

  async _getYummlyImages() {
    const { API_URL, RES_SEARCH_URL, APP_ID, API_KEY, search, allowedIngredient, picture } = this.state;
    this.setState({ imagesLoaded: true });
    console.log(search)
    try {
      let searchItems = `&allowedIngredient[]=${allowedIngredient[0]}`
      for (let i = 0; i < allowedIngredient.length && i < 5; i++) {
        if (allowedIngredient[i] != 'sweet' && allowedIngredient[i] != 'pork' && allowedIngredient[i] != 'kebab') {
          searchItems += `&allowedIngredient[]=${allowedIngredient[i]}`
        }
      }
      console.log(searchItems)
      let response = await fetch(`${API_URL}${RES_SEARCH_URL}_app_id=${APP_ID}&_app_key=${API_KEY}${searchItems}${picture}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();
        console.log("Preloaded", responseJSON)

        this.setState({
          imagesLoaded: false,
          foodImages: responseJSON.matches,
        })
        // console.log(foodImages)
      } else {
        const error = responseJSON.message

        console.log(responseJSON)
        console.log(imagesLoaded)
        this.setState({ errors: responseJSON.errors })
        // Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ imagesLoaded: false, response: error })

      console.log(error)

      // Alert.alert('Unable to get the feed. Please try again later')
    }
  }
  async _getYummlySearch(search) {
    const { API_URL, RES_SEARCH_URL, APP_ID, API_KEY, picture } = this.state;
    this.setState({ imagesLoaded: true });
    try {
      console.log(search)
      let response = await fetch(`${API_URL}${RES_SEARCH_URL}_app_id=${APP_ID}&_app_key=${API_KEY}&q=${search}${picture}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        });

      let responseJSON = null

      if (response.status === 200) {
        responseJSON = await response.json();
        console.log("Preloaded", responseJSON)

        this.setState({
          imagesLoaded: false,
          foodImages: responseJSON.matches,
        })
        // console.log(foodImages)
      } else {
        const error = responseJSON.message

        console.log(responseJSON)
        console.log(imagesLoaded)
        this.setState({ errors: responseJSON.errors })
        // Alert.alert('Unable to get your feed', `Reason.. ${error}!`)
      }
    } catch (error) {
      this.setState({ imagesLoaded: false, response: error })

      console.log(error)

      // Alert.alert('Unable to get the feed. Please try again later')
    }
  }

  loadingView = () => {
    return (
      <LinearGradient colors={['#DAE2F8', '#D6A4A4']} style={styles.loadingView}>
        <View style={styles.activityIndicatorAndButtonContainer}>
          <ActivityIndicator size="large" />
        </View>
      </LinearGradient>
    )
  }
  _renderItem({ item, index }) {
    return (
      <FavSlide
        item={item}
        navigation={this.props.navigation}
      />
    );
  }
  searchYourself(searchFood) {
    search = searchFood
    console.log("Searched Food", search)
    // this.setState({search: search})
    // this._getYummlySearch(search)

  }
  contentView() {
    const { foodImages, imagesLoaded } = this.state
    // console.log("loaded food", foodImages)
    if (foodImages != null && foodImages.length === 0) {
      Alert.alert(
        "Can't find",
        "Please try to search manually in the above search bar",
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: false }
      )
      return (
        <View style={{flex: 1,}}>

          <SearchBar
            lightTheme
            onChangeText={(text) => this.searchYourself(text)}
            // onClear={someMethod}
            placeholder='Type Here...' />
            <Button
              onPress={() => this._getYummlySearch(search)}
              title="Search"
              buttonStyle={{
                backgroundColor: "#1ABC9C",
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 5,
                width: 200,
                height: 45,

              }}
              containerViewStyle={{ marginVertical: 10, alignItems: 'center' }}

            /> 

            
        </View>

      )
    }
    else {
      return (
        <View style={styles.mainContainer}>
          <LinearGradient colors={['#DAE2F8', '#D6A4A4']} style={styles.mainContainer}>
            <View style={styles.imageContainer}>
              {foodImages === null ?
                this.loadingView() :
                <Carousel
                  ref={(c) => { this._carousel = c; }}
                  data={foodImages}
                  renderItem={this._renderItem.bind(this)}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  style={styles.carouselContainer}
                />}
            </View>
          </LinearGradient>

        </View>
      );
    }
  }
  render() {
    const { ingredientsList, imagesLoaded } = this.state
    // console.log("Correct list: ", ingredientsList)

    return (
      <View style={styles.mainContainer}>
        {imagesLoaded ? this.loadingView() : this.contentView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  loadingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityIndicatorAndButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});