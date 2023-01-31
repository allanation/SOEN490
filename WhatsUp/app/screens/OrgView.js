import { StyleSheet, View, Image, Text, Platform } from "react-native";
import Screen from "../components/Screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AttendeeDetails from "./AttendeeDetails";
import AttendeeSchedule from "./AttendeeSchedule";
import colors from "../config/colors";
import React from "react";
import PropTypes from "prop-types";
import UtilBtn from "../components/UtilBtn";
import AppButton from "../components/AppButton";
import { Ionicons } from "@expo/vector-icons";

OrgView.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.any,
};

function OrgView({ route, navigation }) {
  const { prop } = route.params;
  const Tab = createMaterialTopTabNavigator();

}

const styles = StyleSheet.create({
  
});

export default OrgView;
