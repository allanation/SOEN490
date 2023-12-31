/* eslint-disable react/prop-types */
import React from "react";
import { StyleSheet, StatusBar, ImageBackground} from "react-native";
import Constants from "expo-constants";

function Screen({ children, style, backgroundImage, resizeMode }) {
  return (
    <ImageBackground source={{ uri: backgroundImage }} style={[styles.screen, style]} resizeMode={resizeMode}>
      <StatusBar />
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
});

export default Screen;
