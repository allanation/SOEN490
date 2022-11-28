import React from "react";
import { StyleSheet, Image } from "react-native";
import logo from "../assets/Logos/waves.png";
import { Dimensions } from "react-native";

function BottomImg({}) {
  //     <KeyboardAvoidingView
  //   behavior={Platform.OS === "ios" ? "padding" : "height"}
  //   enabled={false}
  //   style={styles.container}
  // >

  return (
    <Image
      style={[styles.container, styles.imageContainer, styles.waves]}
      source={logo}
    />
  );
  // </KeyboardAvoidingView>
}

const imageAspectRatio = (2481 / 1144);
const scaledWidth = Dimensions.get('window').width;
const scaledHeight = (scaledWidth / imageAspectRatio);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        bottom: 0,
    },
    waves: {
        width: scaledWidth,
        height: scaledHeight,
        position: 'absolute',
        bottom: 0,
    } 
});

export default BottomImg;
