import { StyleSheet, Text, View, ScrollView, Alert, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import TitleHeaders from "../components/TitleHeaders";
import UtilBtn from "../components/UtilBtn";
import { useNavigation } from "@react-navigation/native";
import logo from "../Images/w3.png";

function Notifications({ title, status }) {
  const getStyle = () => {
    if (status.valueOf() == "Approved".valueOf()) return styles.approved;
    else if (status.valueOf() == "Rejected".valueOf()) return styles.rejected;
    else return styles.black;
  };

  return (
    <View style={{ height: 350, marginBottom: -241 }}>
      <View style={styles.banner}>
        <View style={{ flex: 1.3 }}>
          <Image
            source={logo}
            style={{
              width: "100%",
              height: "100%",
              resizeMode: "contain",
              borderRadius: 17,
              marginLeft: 7,
            }}
          />
        </View>
        <View style={{ flex: 3, marginLeft: 15 }}>
          <Text style={styles.adminText}>What's Up Admin</Text>
          <Text style={styles.statusMsg}>
            Status For the Event <Text style={styles.eventTitle}>{title}</Text>:
          </Text>
          <Text style={getStyle({ status })}>{status}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.time}>12:15 pm</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "white",
    flex: 0.31,
    borderColor: "black",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    flexDirection: "row",
  },
  adminText: {
    color: "#100101",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "7%",
  },
  statusMsg: {
    color: "#100101",
    fontSize: 14,
    fontWeight: "400",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "7%",
  },
  eventTitle: {
    color: "#100101",
    fontSize: 14,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "7%",
  },
  approved: {
    color: "#03C04A",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "1%",
  },
  rejected: {
    color: "#E3242B",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "1%",
  },
  black: {
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "1%",
  },
  time: {
    color: "black",
    fontWeight: "bold",
    fontSize: 12,
    marginTop: "27%",
  },
});

export default Notifications;
