import React from "react";
import { View, StyleSheet } from "react-native";

const Card = props => {
  return (
    <View {...props} style={{ ...props.style, ...styles.cardContainer }}>
      {props.children}
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    borderRadius: 20,
    elevation: 6,
    margin: 10
  }
});
