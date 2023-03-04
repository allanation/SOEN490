/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform
} from "react-native";
import React from "react";
import logo from "../Images/w3.png";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";

function Notifications({ title, status, statusChangeDate, onPress }) {
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
          <Text style={styles.time}>{statusChangeDate}</Text>
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
    
    width: "95%",
    alignSelf: "center",
    backgroundColor: "#fdfdfd",
    flex: 0.31,
    flexDirection: "row",
    borderRadius: 18,
    shadowColor:"#757575",
    shadowRadius: 4,
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  container: {
    height: 150,
    width: "90%",
    borderRadius: 12,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
    shadowColor:"#757575",
    shadowRadius: 8,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
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
