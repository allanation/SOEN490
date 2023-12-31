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
import BookmarkButton from "../components/BookmarkButton";
import { Ionicons } from "@expo/vector-icons";
import { getCoverImageSource } from "../screens/AttendeeView";

function Event({
  image,
  title,
  organizer,
  date,
  onPress,
  isOrganizer,
  coverImageName,
  id,
  isTicketsPage,
  ...key
}) {
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
        <Text style={styles.text}>
          {title.length < 19 ? title : title.substring(0, 18)}
        </Text>
        <Text style={{ fontSize: 12, color: "#969696" }}>By {organizer}</Text>
        <View style={{ marginTop: 5, flexDirection: "row" }}>
          <Ionicons name="ios-calendar-outline" size={18} color={"#32bca5"} />
          <Text
            style={{
              fontSize: 11,
              color: "#100101",
              marginLeft: "2%",
              marginTop: "2%",
            }}
          >
            {date}
          </Text>
        </View>
      </View>
      {isOrganizer || isTicketsPage ? "" : <BookmarkButton id={id} />}
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
});

export default Event;
