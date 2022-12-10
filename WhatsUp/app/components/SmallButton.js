/* eslint-disable react/prop-types */
import React from "react";
import { Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SmallButton({ image, title, onPress, size }) {
  return (
    <TouchableOpacity
      style={[styles.button, { flexDirection: "row" }]}
      onPress={onPress}
    >
      <Ionicons
        name={image}
        size={24}
        color={"#32bca5"}
        style={{ marginLeft: size }}
      />
      <Text style={[styles.text, { marginRight: size }]}>{title}</Text>
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
    shadowColor: "#100101", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 3, //IOS
    elevation: 4, // Android
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
