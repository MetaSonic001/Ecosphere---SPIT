import PropTypes from "prop-types";
import React from "react";
import { Card, CardAction, CardContent, CardTitle, StyleSheet, View } from 'react-native';

const FoodCard = ({ props }) => {

  return (
    <Card>
      <CardTitle
            subtitle={props.food_name.toUpperCase()}
      />
      <View style={styles.row}>
        <View style={styles.box1}>
          <CardTitle
            subtitle="Nutrients"
          />
          <CardContent text={`${props.nf_total_fat} g Fat`} />
          <CardContent text={`${props.nf_total_carbohydrate} g Carbohydrate`} />
          <CardContent text={`${props.nf_protein} g Protein`} />
        </View>
        <View style={styles.box2} >
          <CardTitle
              subtitle={`Serving (${props.serving_qty} ${props.serving_unit})`}
          />
          <CardContent text={`${props.serving_weight_grams} g`} />
          <CardContent text={`${props.nf_calories} Kcal`} />
          <CardAction 
            separator={true}
            inColumn={true}>
           
          </CardAction>
        </View>
      </View>
    </Card>
  );
};

FoodCard.propTypes = {
  props: PropTypes.any,
  
};

export default FoodCard;


const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  },
  box1: {
    flex: 1,
  },
  box2: {
    flex: 1,
  }
});