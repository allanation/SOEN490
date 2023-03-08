/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useEffect } from "react";
import { StyleSheet, View, ScrollView, Platform, Alert } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import TitleHeaders from "../components/TitleHeaders";
import UtilBtn from "../components/UtilBtn";
import ReviewIOSDateTimePicker from "../components/ReviewIOSDateTimePicker";
import ReviewAndroidDateTimePicker from "../components/ReviewAndroidDateTimePicker";
import AppTextInput from "../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "expo-storage";

function OrgReviewDateInfo() {
  const navigation = useNavigation();
  const [days, setDays] = useState("");
  const [itinerary, setItinerary] = useState([]);
    useEffect(() => {
     getDayData();
     getItineraryData();
  }, []);

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
       navigation.push("OrgReviewDaySchedule", {day: parseInt(days), i: 1, itinerary: itinerary});
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getDayData = async () => {
    try {
      const day = await Storage.getItem({
        key: "days",
      });
      if (day !== null && day.length !==0) {
          setDays(day);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getItineraryData = async () => {
    try {
      const itinerary = await Storage.getItem({
        key: "itinerary",
      });
      if (itinerary !== null) {
        setItinerary(JSON.parse(itinerary));
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
          onPress={() => navigation.navigate("OrgReviewPOC")}
        />
        <TitleHeaders
          style={{ alignSelf: "center" }}
          title={"Set Date Information"}
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
            <ReviewIOSDateTimePicker />
          ) : (
            <ReviewAndroidDateTimePicker />
          )}
        </View>
      </View>
      <View>
        <AppButton title={"Next"} onPress={() => validateEventDate(days)}></AppButton>
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

export default OrgReviewDateInfo;
