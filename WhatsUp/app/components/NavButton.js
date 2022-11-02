import React from "react";
<<<<<<< HEAD
import { TouchableOpacity, StyleSheet, Platform, Image } from "react-native";
=======
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
>>>>>>> c7d2936d716cfeda2a1c6abf2ecb5c4853f450f9

function NavButton({ image, position, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { flexDirection: "row" }, { left: position }]}
      onPress={onPress}
    >
      <Image source={image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 1,
    marginVertical: 5,
    height: 33,
  },
  text: {
    color: "#32bca5",
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "2%",
  },
});

export default NavButton;
