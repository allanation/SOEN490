import React from "react";
import { Text, StyleSheet } from "react-native";
import colors from "../config/colors";

function ScreenSubtitle({ subtitle }) {
  return <Text style={styles.text}>{subtitle}</Text>;
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
