import React from "react";
import ImgOrgBottom from "../components/ImgOrgBottom"
import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import TitleHeaders from "../components/TitleHeaders";
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
      .catch(() => {});
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
      <TitleHeaders title="Forgot Password?" />
      <TitleHeaders isTitle = {false} title="Enter your email to receive a verification link" />
      <AppTextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={userEmail}
      />

      <AppButton title="Submit" onPress={checkIfEmailExists} />

      <View style={styles.organizertwo}>
        <Links style={styles.link} link="Back to Login" onPress={Login} />
      </View>
      <ImgOrgBottom resizeMode="contain" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  organizertwo: {
    paddingLeft: 110,
    width: "98%",
  },
  link: {
    marginLeft: "14.1%",
  },
});
