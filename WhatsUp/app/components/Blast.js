/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getCoverImageSource } from "../screens/AttendeeView";

function Blast({
  image,
  title,
  date,
  message,
  onPress,
  coverImageName,
  id,
  ...key
}) {

  const subTitle = title.substring(0, 10) + "...";
  const subMessage = message.substring(0, 99) + "...";

  return (
    <TouchableOpacity
      style={[styles.button, { flexDirection: "row" }, { marginTop: 16 }]}
      onPress={onPress}
    >
      <View style={{ flex: 2 }}>
        <Image
          source={getCoverImageSource(coverImageName)}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 19,
          }}
        />
      </View>

      <View style={{ flex: 3, marginLeft: 15 }}>
        <View style={{flexDirection: "row"}}>
        <Text style={styles.text}>
          {title.length < 11 ? title : subTitle}
        </Text>
        <Text
                    style={{
                      fontSize: 9,
                      color: "#100101",
                      marginRight: "2%",
                      marginTop: "5%",
                      flex: 1,
                      textAlign: "right",
                    }}
                  >
                    {date}
                  </Text>
        </View>
        <View style={{ marginTop: 5, flexDirection: "row" }}>
            <Text style={styles.message}> {message.length < 100 ? message : subMessage} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,
    borderWidth: 0,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    height: 81,
    width: "95%",
    shadowColor: "#100101", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 3, //IOS
    elevation: 4, // Android
  },
  text: {
    color: "#100101",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "2%",
  },
  message: {
    fontSize: 10,
    marginRight: "2%",
  },
});

export default Blast;