/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Platform, Alert } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import TitleHeaders from "../components/TitleHeaders";
import UtilBtn from "../components/UtilBtn";
import IOSDateTimePicker from "../components/IOSDateTimePicker";
import AndroidDateTimePicker from "../components/AndroidDateTimePicker";
import AppTextInput from "../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "expo-storage";

function OrganizerDateInfo() {
  const navigation = useNavigation();
  const itinerary = [];
  const [days, setDays] = useState("");
  const validateEventDate = async (days) => {
    if(days.length == 0){
      Alert.alert("Error", "Please fill out the number of days.");
      return;
    }
    try {
      //Get NewEvent object
      const newDateInformation = await Storage.getItem({
        key: "eventDates",
      });
      const newEventDates = JSON.parse(newDateInformation);
      if (!newEventDates) {
        Alert.alert("Error", "Please confirm your event's date information.");
        return;
      } else {
        await Storage.setItem({
          key: 'days',
          value: days
        })
        navigation.push("OrgDay", {day: parseInt(days), i: 1, itinerary: itinerary});
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <UtilBtn
          icon='chevron-back-outline'
          style={{ position: "absolute", left: 0 }}
          testID={"backButton"}
          onPress={() => navigation.navigate("POC")}
        />
        <TitleHeaders
          style={{ alignSelf: "center" }}
          title={"Set Date Information"}
          testID={"dateInfoTitle"}
        />
      </View>
      <View style={{ width: "100%", display: "flex" }}>
        <TitleHeaders
          style={{ alignSelf: "center" }}
          isTitle={false}
          title='Please pick the dates for your event'
        />
      </View>
      <View style={{paddingTop: 15}}>
      <AppTextInput
            placeholder="Number of days"
            value={days}
            onChangeText={(day) => setDays(day)}
          ></AppTextInput>
      </View>
      <View style={{ paddingTop: 2 }}>
        <View>
          {Platform.OS === "ios" ? (
            <IOSDateTimePicker />
          ) : (
            <AndroidDateTimePicker />
          )}
        </View>
      </View>
      <View>
        <AppButton title={"Next"} testID={"nextButton"} onPress={() => validateEventDate(days)}></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  newEventHeader: {
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  headerContent: {
    justifyContent: "flex-start",
    width: "100%",
  },
  icon: {
    marginLeft: "auto",
  },
  coverPage: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  paragraph: { textAlign: "center" },
});

export default OrganizerDateInfo;
