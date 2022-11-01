import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import ScreenSubtitle from "../components/ScreenSubtitle";
import ScreenTitle from "../components/ScreenTitle";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { fetchSignInMethodsForEmail } from "firebase/auth";

export default function ResetPassword() {
  const navigation = useNavigation();
  const [userEmail, setEmail] = useState("");

  const sendResetEmail = () => {
    sendPasswordResetEmail(auth, userEmail)
      .then(() => {
        Alert.alert(
          "Email sent sucessfully.",
          "Check your emails to reset the password."
        );
      })
      .catch((error) => {});
  };

  //Check if email exists in the database before sending the link
  const checkIfEmailExists = () => {
    fetchSignInMethodsForEmail(auth, userEmail)
      .then((result) => {
        if (result === undefined || result.length == 0) {
          Alert.alert("We couldn't find an account with that email address.");
        } else {
          //If email exists, send the link
          sendResetEmail();
        }
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert("Please enter a valid email address.");
      });
  };

  const Login = () => {
    navigation.navigate("Login");
  };

  return (
    <Screen style={{ padding: 10, marginTop: 80 }}>
      <ScreenTitle title="Forgot Password?" />
      <ScreenSubtitle subtitle="Enter your email to receive a verification link" />
      <AppTextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={userEmail}
      />

      <AppButton
        style={{
          shadowColor: "black", // IOS
          shadowOffset: { height: 1, width: 1 }, // IOS
          shadowOpacity: 0.2, // IOS
          shadowRadius: 3, //IOS
          elevation: 4, // Android
        }}
        title="Submit"
        onPress={checkIfEmailExists}
      />

      <View style={styles.organizertwo}>
        <Links style={styles.link} link="Back to Login" onPress={Login} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  organizer: {
    alignItems: "flex-start",
    width: "50%",
  },
  organizertwo: {
    paddingLeft: 110,
    width: "98%",
  },
  rowContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
  roundshape: {
    backgroundColor: "grey",
    height: 65,
    width: 65,
    justifyContent: "center",
    alignSelf: "center",
    alignContent: "center",
    borderRadius: 45,
  },
  link: {
    marginLeft: "14.1%",
  },
});
