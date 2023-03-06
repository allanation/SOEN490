/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet, View, Platform, Alert, Text } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import TitleHeaders from "../components/TitleHeaders";
import UtilBtn from "../components/UtilBtn";
import ReviewIOSDateTimePicker from "../components/ReviewIOSDateTimePicker";
import ReviewAndroidDateTimePicker from "../components/ReviewAndroidDateTimePicker";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

function OrgReviewDateInfo() {
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
        navigation.navigate("OrgReviewDaySchedule");
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
          onPress={() => navigation.navigate("OrgReviewPOC")}
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
      <View style={{ paddingTop: 20 }}>
        <View>
          {Platform.OS === "ios" ? (
            <ReviewIOSDateTimePicker />
          ) : (
            <ReviewAndroidDateTimePicker />
          )}
        </View>
        {Platform.OS === "ios" ? (
          <Text style={{ alignSelf: "center", color: colors.lightGrey }}>
            You must confirm your event dates before proceeding.
          </Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <View>
        <AppButton title={"Next"} testID={"nextButton"} onPress={validateEventDate}></AppButton>
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
