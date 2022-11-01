import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";

function SmallButton({ image, title, onPress, size }) {
  return (
    <TouchableOpacity
      style={[styles.button, { flexDirection: "row" }, { width: size }]}
      onPress={onPress}
    >
      <Image source={image} />
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 0.25,
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

export default SmallButton;
