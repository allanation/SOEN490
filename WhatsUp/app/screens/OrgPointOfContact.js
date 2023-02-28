/* eslint-disable no-unused-vars */
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import TitleHeaders from "../components/TitleHeaders";
import UtilBtn from "../components/UtilBtn";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "expo-storage";
import { storePOC } from "./OrgDetails";

function OrganizerPOC() {
  const navigation = useNavigation();
  const [pocName, setPocName] = useState("");
  const [pocPhoneNum, setPocPhoneNum] = useState("");
  const [pocEmail, setPocEmail] = useState("");

  useEffect(() => {
    getPOCData();
  }, []);

  const handleAddingOrganizerPOC = async (pocName, pocPhoneNum, pocEmail) => {
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

    const POC = {
      pocName: pocName,
      pocPhoneNum: pocPhoneNum,
      pocEmail: pocEmail,
    };

    //If every mandatory fields is filled out, store the information and go to next page
    storePOC(POC);
    navigation.navigate('DateInfo')
  };

  const goBackToNewEvent = async () => {
    const POC = {
      pocName: pocName,
      pocPhoneNum: pocPhoneNum,
      pocEmail: pocEmail,
    };

    //Store the information before leaving page
    storePOC(POC);
    navigation.navigate("OrgReviewEvent");
  };

  const getPOCData = async () => {
    try {
      const POC = await Storage.getItem({
        key: "POC",
      });
      if (POC !== null) {
        const POCObject = JSON.parse(POC);
        if (POCObject.pocName.length != 0) {
          setPocName(POCObject.pocName);
        }
        if (POCObject.pocPhoneNum.length != 0) {
          setPocPhoneNum(POCObject.pocPhoneNum);
        }
        if (POCObject.pocEmail.length != 0) {
          setPocEmail(POCObject.pocEmail);
        }
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
          onPress={() => goBackToNewEvent()}
        />
        <TitleHeaders
          style={{ alignSelf: "center" }}
          title={"Contact Information"}
        />
      </View>
      <View style={{ width: "100%", display: "flex" }}>
        <TitleHeaders
          style={{ alignSelf: "center" }}
          isTitle={false}
          title='Please fill the following information'
        />
      </View>
      <ScrollView style={{ paddingTop: 20 }}>
        <View>
          <AppTextInput
            placeholder='Name'
            value={pocName}
            onChangeText={(currentName) => setPocName(currentName)}
          ></AppTextInput>
          <AppTextInput
            placeholder='Phone Number'
            value={pocPhoneNum}
            onChangeText={(currentPhoneNumber) =>
              setPocPhoneNum(currentPhoneNumber)
            }
          ></AppTextInput>
          <AppTextInput
            placeholder='Email'
            value={pocEmail}
            onChangeText={(currentEmail) => setPocEmail(currentEmail)}
          ></AppTextInput>
        </View>
        <View style={{ height: 350 }}>
          <Text></Text>
        </View>
      </ScrollView>
      <AppButton
        title={"Next"}
        testID={"nextButton"}
        onPress={() => handleAddingOrganizerPOC(pocName, pocPhoneNum, pocEmail)}
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
