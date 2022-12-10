/* eslint-disable react/prop-types */
import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/colors";

function ScreenSubtitle({ subtitle, style }) {
  return <Text style={(styles.text, style)}>{subtitle}</Text>;
}

export default ScreenSubtitle;

const styles = StyleSheet.create({
  text: {
    color: colors.darkGrey,
    paddingVertical: 6,
    marginBottom: 6,
    marginLeft: "1%",
  },
});
