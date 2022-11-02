import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import ItineraryEvent from "../components/ItineraryEvent";
function OrganizerDaySchedule({ day }) {
  itinerary = [
    {
      title: "Round Table with William",
      startTime: "9:00PM",
      endTime: "10:00PM",
      location: "Auditorium 101",
    },
    {
      title: "Round Table with William",
      startTime: "9:00PM",
      endTime: "10:00PM",
      location: "Auditorium 101",
    },
    {
      title: "Round Table with William",
      startTime: "9:00PM",
      endTime: "10:00PM",
      location: "Auditorium 101",
    },
    {
      title: "Round Table with William",
      startTime: "9:00PM",
      endTime: "10:00PM",
      location: "Auditorium 101",
    },
  ];
  return (
    <Screen>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={{
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Day {day ? day : "X"} schedule
            </Text>
            <Text style={{ color: colors.darkGrey }}>
              <Text style={styles.paragraph}>
                Please fill the following information
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-start",
            marginLeft: 12,
            marginTop: 18,
            backgroundColor: "white",
            borderRadius: 20,
            width: 32,
            height: 32,
            justifyContent: "center",
            shadowColor: "black", // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 0.2, // IOS
            shadowRadius: 3, //IOS
            elevation: 2, // Android
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={32}
            color={colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 0.2, // IOS
            shadowRadius: 3, //IOS
            elevation: 2, // Android
            alignSelf: "flex-end",
            marginRight: 24,
          }}
        >
          <Ionicons
            name="add-circle-outline"
            size={40}
            color={colors.primary}
          />
        </TouchableOpacity>
        <View style={{ marginTop: 12 }}>
          <View>
            {itinerary ? (
              itinerary.map((it) => (
                <ItineraryEvent
                  title={it.title}
                  startTime={it.startTime}
                  endTime={it.endTime}
                  location={it.location}
                />
              ))
            ) : (
              <Text
                style={{
                  color: colors.lightGrey,
                  marginLeft: 24,
                  marginTop: 18,
                }}
              >
                'No items in your itinerary yet...'
              </Text>
            )}
          </View>
        </View>
        <View>
          <AppButton title={"Next"}></AppButton>
        </View>
      </ScrollView>
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

export default OrganizerDaySchedule;
