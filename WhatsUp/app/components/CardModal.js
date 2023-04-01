/* eslint-disable react/prop-types */
import React from "react";
import { Modal, StyleSheet, View, } from "react-native";
import { BlurView } from "expo-blur";
import colors from "../config/colors";

function CardModal({ children, style, ...otherProps }) {
  return (
    <Modal {...otherProps}>
      <BlurView  style={styles.blurBackground} intensity={10}>
        <View OnPress={() => console.log("")} style={[styles.centeredView, style]}>{children}</View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: colors.offWhite,
    height: "50%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
},
});

export default CardModal;
