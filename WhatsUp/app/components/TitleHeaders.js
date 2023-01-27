/* eslint-disable react/prop-types */
import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import colors from "../config/colors";

function TitleHeaders({ title, style, isTitle = true }) {
  return (
    <Text
      style={[
        styles.text,
        style,
        isTitle
          ? { fontSize: 28, fontWeight: "bold" }
          : {
              fontSize: 20,
              color: colors.darkGrey,
              paddingVertical: 6,
              marginBottom: 6,
              marginLeft: "1%",
            },
      ]}
    >
      {title}
    </Text>
  );
}

export default TitleHeaders;

const styles = StyleSheet.create({
  text: {
    marginLeft: "1%",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
});
