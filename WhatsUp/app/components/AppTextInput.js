import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import colors from "../config/colors";

function AppTextInput({ ...otherProps }) {
  return (
    <View style={styles.container}>
      <TextInput style={styles.text} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colors.lightGrey,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: "98%",
    marginVertical: 10,
    borderStyle: "solid",
    borderWidth: 1,
    marginLeft: "1%",
  },
  text: {
    color: "black",
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
});

export default AppTextInput;
