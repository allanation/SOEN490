import { StyleSheet, View, Image, Text, Linking } from "react-native";
import Screen from "../components/Screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AttendeeDetails from "./AttendeeDetails";
import AttendeeSchedule from "./AttendeeSchedule";
import colors from "../config/colors";
import React, { useState } from "react";
import PropTypes from "prop-types";
import UtilBtn from "../components/UtilBtn";
import AppButton from "../components/AppButton";

AttendeeView.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.any,
};

function AttendeeView({ route, navigation }) {
  const { prop } = route.params;
  const Tab = createMaterialTopTabNavigator();

  const [buttonText, setButtonText] = useState("Going");

  const handleGoing = (buttonText) => {
    if (buttonText == "Going") {
      setButtonText("✔ Going");
    } else {
      setButtonText("Going");
    }
  };

  let coverImageSource;

  if (prop.coverImage == "Art") {
    coverImageSource = require("../assets/CoverImages/Art.jpg");
  } else if (prop.coverImage == "Auditorium") {
    coverImageSource = require("../assets/CoverImages/Auditorium.jpg");
  } else if (prop.coverImage == "Concordia") {
    coverImageSource = require("../assets/CoverImages/Concordia.jpg");
  } else if (prop.coverImage == "Frosh") {
    coverImageSource = require("../assets/CoverImages/Frosh.jpg");
  } else if (prop.coverImage == "Graduation") {
    coverImageSource = require("../assets/CoverImages/Graduation.jpg");
  } else if (prop.coverImage == "McGill") {
    coverImageSource = require("../assets/CoverImages/McGill.jpeg");
  } else if (prop.coverImage == "Park") {
    coverImageSource = require("../assets/CoverImages/Park.jpg");
  } else if (prop.coverImage == "Sports") {
    coverImageSource = require("../assets/CoverImages/Sports.jpg");
  } else if (prop.coverImage == "Studying") {
    coverImageSource = require("../assets/CoverImages/Studying.jpg");
  }

  return (
    <Screen style={{ backgroundColor: "white" }}>
      <Image
        source={coverImageSource}
        resizeMode="cover"
        style={styles.headerImage}
      />

      <View style={styles.toolContainer}>
        <UtilBtn
          icon="chevron-back-outline"
          iconSize={25}
          style={styles.toolBtn}
          onPress={() => navigation.goBack()}
        />
        <UtilBtn
          icon="ios-bookmark-outline"
          iconSize={20}
          style={styles.toolBtn}
        >
          {" "}
        </UtilBtn>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            width: "35%",
            marginRight: "5%",
            marginLeft: "5%",
          },
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            marginHorizontal: "10%",
          },
        }}
      >
        <Tab.Screen
          name="Details"
          component={AttendeeDetails}
          initialParams={{ prop: prop }}
        />
        <Tab.Screen
          name="Schedule"
          component={AttendeeSchedule}
          initialParams={{ prop: prop.itinerary }}
        />
      </Tab.Navigator>
      <View
        style={{
          height: "10%",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: "5%",
          borderTopColor: "silver",
          borderTopWidth: 1,
        }}
      >
        {prop.link.length > 0 ? (
          <AppButton
            style={styles.btn}
            title="Buy Tickets"
            onPress={() => {
              Linking.openURL(prop.link);
            }}
          />
        ) : (
          <Text></Text>
        )}
        <AppButton
          style={styles.btn}
          title={buttonText}
          onPress={() => {
            handleGoing(buttonText);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "35%",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -50,
  },
  btn: {
    borderRadius: 3,
    marginRight: 10,
    height: "63%",
    width: "auto",
    alignItems: "center",
  },
  toolContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    marginTop: 70,
    width: "100%",
    paddingHorizontal: "10%",
  },
  toolBtn: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
});

export default AttendeeView;
