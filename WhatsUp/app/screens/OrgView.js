import { StyleSheet, View, Image, Text, Platform, ScrollView, Alert } from "react-native";
import Screen from "../components/Screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrgDetails from "./OrgDetails";
import OrgStatus from "./OrgStatus";
import AttendeeSchedule from "./AttendeeSchedule";
import colors from "../config/colors";
import React, { useState } from "react";
import PropTypes from "prop-types";
import UtilBtn from "../components/UtilBtn";
import AppButton from "../components/AppButton";
import { Ionicons } from "@expo/vector-icons";
import AppModal from "../components/AppModal";
import AppTextInput from "../components/AppTextInput";
import TitleHeaders from "../components/TitleHeaders";

OrgView.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.any,
};

function OrgView({ route, navigation }) {
  const { prop } = route.params;
  const Tab = createMaterialTopTabNavigator();

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

  const [modalVisible, setModalVisible] = useState(false);
  const [orgBlast, setOrgBlast] = useState("");
  const [message, setMessage] = useState("");

  const handleSendBlast = async (
    message
  ) => {
    if (message.length == 0) {
      Alert.alert("Error", "Please fill out the message.");
      return;
    }

    console.log(message);
    setModalVisible(false);
    setMessage("");
  };

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
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            width: "20%",
            marginRight: "4%",
            marginLeft: "4%",
          },
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            marginHorizontal: "5%",
          },
        }}
      >
        <Tab.Screen
          name="Details"
          component={OrgDetails}
          initialParams={{ prop: prop }}
        />
        <Tab.Screen
          name="Schedule"
          component={AttendeeSchedule}
          initialParams={{ prop: prop.itinerary }}
        />
        <Tab.Screen
          name="Status"
          component={OrgStatus}
          initialParams={{ prop: prop }}
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
        <AppButton
          style={styles.btn}
          title={
            prop.eventStatus === "Rejected" ? (
              "Resubmit"
            ) : (
              <Ionicons
                name="ios-megaphone-outline"
                size={18}
                color={colors.white}
              >
                {" "}
                <Text style={styles.text}>Blast Info</Text>
              </Ionicons>
            )
          }
          onPress={() => {setModalVisible(true)}}
        />
      </View>
      <AppModal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
         }}
      >
        <View style={styles.modalView}>
          <View style={styles.inputView}>
            <UtilBtn
              icon="chevron-back-outline"
              style={{ position: "absolute" }}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <TitleHeaders style={{ alignSelf: "center" }} title={"Blast Info"} />
            <Text
              style={{ marginLeft: '1%' ,marginBottom: 5, color: 'silver', marginTop: "1%" }}
            >
              From {prop.eventName} Event
            </Text>
            <ScrollView
              keyboardDismissMode="interactive"
              style={{ width: "100%" }}
            >
              <AppTextInput
                placeholder="Message"
                onChangeText={(currentMessage) =>
                  setMessage(currentMessage)
                }
              />
              <AppButton
                title="Send"
                style={{ marginTop: 0 }}
                onPress={() =>
                  handleSendBlast(
                    message
                  )
                }
              />
            </ScrollView>
          </View>
        </View>
      </AppModal>
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
    borderRadius: 4,
    marginRight: 10,
    height: "58%",
    width: "auto",
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
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    textAlign: "center",
    textAlignVertical: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 20,
    paddingTop: 20,
    width: "86%",
    // height: "62%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputView: {
    marginTop: 8,
    borderColor: colors.lightGrey,
    borderRadius: 7,
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
  },
});

export default OrgView;
