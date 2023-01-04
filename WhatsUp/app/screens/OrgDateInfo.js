/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, View, ScrollView, Platform, Alert } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import ScreenTitle from "../components/ScreenTitle";
import AddBtn from "../components/AddBtn";
import IOSDateTimePicker from "../components/IOSDateTimePicker";
import AndroidDateTimePicker from "../components/AndroidDateTimePicker";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "expo-storage";

function OrganizerDateInfo() {
  const navigation = useNavigation();
  const validateEventDate = async () => {
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
        navigation.navigate("OrgDay");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <AddBtn
          icon="chevron-back-outline"
          style={{ position: "absolute", left: 0 }}
          onPress={() => navigation.navigate("POC")}
        />
        <ScreenTitle
          style={{ alignSelf: "center" }}
          title={"Set Date Information"}
        />
      </View>
      <View style={{ width: "100%", display: "flex" }}>
        <ScreenTitle
          style={{ alignSelf: "center" }}
          isTitle={false}
          title="Please pick the dates for your event"
        />
      </View>
      <ScrollView style={{ paddingTop: 20 }}>
        <View>
          {Platform.OS === "ios" ? (
            <IOSDateTimePicker />
          ) : (
            <AndroidDateTimePicker />
          )}
        </View>
      </ScrollView>
      <View>
        <AppButton title={"Next"} onPress={validateEventDate}></AppButton>
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
