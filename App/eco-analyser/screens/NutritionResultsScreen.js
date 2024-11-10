import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
//import { Subheader } from "react-native";
const fields = ['item_name', 'brand_name', 'item_id', 'brand_id', 'upc', 'nf_calories', 'nf_calories_from_fat', 'nf_total_fat', 'nf_total_fat', 'nf_saturated_fat', 'nf_monounsaturated_fat', 'nf_polyunsaturated_fat', 'nf_trans_fatty_acid', 'nf_cholesterol', 'nf_sodium', 'nf_total_carbohydrate', 'nf_dietary_fiber', 'nf_sugars', 'nf_protein', 'nf_serving_size_qty', 'nf_serving_size_unit'];
/*function getFoodSearchResult(ingredientsList) {
  let myApiUrl="https://api.nutritionix.com/v1_1/search/"
  let searchtext=ingredientsList
  return fetch(`${myApiUrl}`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json",
    },
    body: JSON.stringify({
      query: ingredientsList,
      appID:"95f7c961",
      appkey:"77e69981e751d6bb5619fbd7b083e1ea"

    })
  })
  
    .then(response => response.json())
    .then(responseJson => {
      console.log(responseJson);
      return responseJson;
    })
    .catch(error => {
      console.error(error);
    });
}*/
  class NutritionalResultsScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchResult: "",
        loading: "true",
      };
    }
  
   /* componentDidMount() {
        getFoodSearchResult(this.props.navigation.state.params.ingredientsList).then(
          result =>
            this.setState({
              searchResult: result.foods,
              loading: false
            })
        );
    }*/
      static navigationOptions = ({ navigation }) => ({
        title: `Search results`,
        headerRight: (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              navigation.navigate(navigation.state.params.searchCategory);
            }}
            underlayColor="#fff"
          >
          </TouchableOpacity>
        )
        //headerStyle: { backgroundColor: 'red' },
      });
    
      render() {
      /*  if (this.state.loading === "true") {
          return (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#1E6738" />
            </View>
          );
        }
      if (this.state.searchResult == null || this.state.searchResult == "") {
          return (
            
              <Text>`No results for: ${
                this.props.navigation.state.params.ingredientsList
              }`}
            </Text>
          );
        }
    else{*/
    return (
      /*<ScrollView>
        {this.state.searchResult.map(obj => {
          console.log(obj);
        
            return (
              <FoodCard
                props={obj}
               
              />
            );
          
        })}
        {console.log(this.state.searchResult)}
      </ScrollView>
      */
      <Text> Success</Text>
    );
  }
 // }
}
        export default NutritionalResultsScreen;

        const styles = StyleSheet.create({
          addButton: {
            marginRight: 10,
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#fff"
          },
          addButtonText: {
            color: "white",
            textAlign: "center",
            paddingLeft: 10,
            paddingRight: 10,
            fontWeight: "bold"
          },
          subHeader: {
            flexDirection: "row",
            flex: 1
          },
          flex1: {
            flex: 0.6
          },
          flex2: {
            flex: 0.4
          }
        });
        