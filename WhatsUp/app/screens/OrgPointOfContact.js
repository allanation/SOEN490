import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import ScreenSubtitle from "../components/ScreenSubtitle";
import ScreenTitle from "../components/ScreenTitle";
import BackBtn from "../components/BackBtn";
import { useNavigation } from "@react-navigation/native";

function OrganizerPOC() {
  const navigation = useNavigation();
  const [pocName, setPocName] = useState("");
  const [pocPhoneNum, setPocPhoneNum] = useState("");
  const [pocEmail, setPocEmail] = useState("");

  const handleAddingOrganizerPOC= async (
    pocName,
    pocPhoneNum,
    pocEmail) => {  

  if (pocName.length == 0) {
    Alert.alert("Error", "Please fill out the name.");
    return;
  }
  if (pocPhoneNum.length == 0) {
    Alert.alert("Error", "Please fill out the phone number.");
    return;
  }
  if (pocEmail.length == 0) {
    Alert.alert("Error", "Please fill out the email.");
    return;
  }
    //If every mandatory fields is filled out, go to next page
    navigation.navigate('DateInfo')
  }

  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: "100%", display: "flex" }}>
        <ScreenTitle
          style={{ alignSelf: "center" }}
          title={"Contact Information"}
        />
        <ScreenSubtitle
          style={{ alignSelf: "center" }}
          subtitle="Please fill the following information"
        />
      </View>
      <BackBtn onPress={() => navigation.navigate("NewEvent")} />
      <ScrollView style= {{paddingTop: 20}}>
        <View>
          <AppTextInput
            placeholder="Name"
            onChangeText={(currentName) => setPocName(currentName)}
          ></AppTextInput>
          <AppTextInput
            placeholder="Phone Number"
            onChangeText={(currentPhoneNumber) =>
              setPocPhoneNum(currentPhoneNumber)
            }
          ></AppTextInput>
          <AppTextInput
            placeholder="Email"
            onChangeText={(currentEmail) => setPocEmail(currentEmail)}
          ></AppTextInput>
        </View>
        <View style={{ height: 350 }}>
          <Text></Text>
        </View>
      </ScrollView>
      <AppButton
        title={"Next"}
        onPress={() => handleAddingOrganizerPOC(pocName,pocPhoneNum,pocEmail)}
      ></AppButton>
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
  shadow: {
    justifyContent: "center",
    shadowColor: "black", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 3, //IOS
    elevation: 2, // Android
  },
  bottom: { flex: 1, justifyContent: "flex-end", marginBottom: 36 },
});

export default OrganizerPOC;
