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
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomImg from "../components/ImgOrgBottom";

function OrganizerDateInfo() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Screen>
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
                Set Date Information
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
              borderRadius: 32,
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
          <View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 24,
              }}
            >
              <View style={{ width: "50%", justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  {/* Start Date
                </Text>
                <View
                  style={{
                    alignSelf: "center",
                    width: "60%",
                  }}
                >
                  <DateTimePicker mode="date" value={new Date()} />
                </View>
              </View>
              <View style={{ width: "50%", justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  End Date */}
                </Text>
                <View
                  style={{
                    alignSelf: "center",
                    width: "60%",
                  }}
                >
                  <DateTimePicker mode="date" value={new Date()} />
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 24,
              }}
            >
              <View style={{ width: "50%", justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  {/* Start Time
                </Text>
                <View
                  style={{
                    alignSelf: "center",
                    width: "50%",
                  }}
                >
                  <DateTimePicker
                    mode="time"
                    value={new Date()}
                    minuteInterval="5"
                  />
                </View>
              </View>
              <View style={{ width: "50%", justifyContent: "center" }}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                  }}
                >
                  End Time */}
                </Text>
                <View
                  style={{
                    alignSelf: "center",
                    width: "50%",
                  }}
                >
                  {/* <DateTimePicker
                    mode="time"
                    value={new Date()}
                    minuteInterval="5"
                  /> */}
                </View>
              </View>
            </View>
            <View>
              <AppButton title={"Next"}></AppButton>
            </View>
            {/* <BottomImg /> */}
          </View>
        </Screen>
      </ScrollView>
    </SafeAreaView>
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
