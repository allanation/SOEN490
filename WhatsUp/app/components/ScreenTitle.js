import React from "react";
import { Text, StyleSheet } from "react-native";

function ScreenTitle({ title, style }) {
  return <Text style={[styles.text, style]}>{title}</Text>;
}

export default ScreenTitle;

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: "1%",
  },
});
