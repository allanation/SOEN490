import React from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import colors from '../config/colors';
/* eslint-disable react/prop-types */

function AppTextInput({ style, ...otherProps }) {
  return (
    <View style={[styles.container, style]}>
      <TextInput placeholderTextColor = "grey" style={styles.text} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderColor: colors.lightGrey,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: "98%",
    marginVertical: 10,
    opacity: 0.9,
    borderWidth: 1,
    marginLeft: "1%",
  },
  text: {
    opacity: 1,
    color: "black",
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
});

export default AppTextInput;
