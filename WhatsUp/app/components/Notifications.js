import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import TitleHeaders from "../components/TitleHeaders";
import UtilBtn from "../components/UtilBtn";
import { useNavigation } from "@react-navigation/native";
import logo from "../Images/w3.png";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

function Notifications({ title, status, onPress }) {
  const getStyle = () => {
    if (status.valueOf() == "Approved".valueOf()) return styles.approved;
    else if (status.valueOf() == "Rejected".valueOf()) return styles.rejected;
    else return styles.black;
  };

  return (
    <View style={{ height: 350, marginBottom: -230 }}>
      <View style={styles.banner}>
        <View style={{ flex: 1.3 }}>
          <Image
            source={logo}
            style={{
              width: "100%",
              height: "93%",
              resizeMode: "contain",
              borderRadius: 17,
              marginTop: 5,
              marginLeft: 7,
            }}
          />
        </View>
        <View style={{ flex: 3, marginLeft: 15 }}>
          <Text style={styles.adminText}>What's Up Admin</Text>
          <Text style={styles.eventTitle}>{title}:</Text>
          <Text style={getStyle({ status })}>{status}</Text>
        </View>
        <View style={{ flex: 1, marginLeft: 15 }}>
          <Text style={styles.time}>2m ago</Text>
          <TouchableOpacity onPress={onPress}>
            <Ionicons
              name="ios-trash-outline"
              size={15}
              color={colors.primary}
              style={{
                marginTop: "55%",
                marginLeft: "20%",
              }}
            ></Ionicons>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "white",
    flex: 0.31,
    flexDirection: "row",
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 25,
    elevation: 5,
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
    fontSize: 12,
    marginTop: "27%",
  },
});

export default Notifications;
