/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import ScreenSubtitle from "../components/ScreenSubtitle";
import ScreenTitle from "../components/ScreenTitle";
import logo from "../Images/w3.png";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert(
          "Logged in sucessfully",
          "Email and password are valid",
          [{ text: "OK", onPress: () => console.log("") }],
          { cancelable: false }
        );
        // navigation.navigate("UserDashboard") or OrganzierDashboard
      })
      .catch(() => {
        Alert.alert(
          "Try again",
          "Invalid email or password.",
          [{ text: "OK", onPress: () => console.log("") }],
          { cancelable: false }
        );
      });
  };
  const SignupPressed = () => {
    navigation.navigate("SignUp");
  };

  const ResetPassword = () => {
    navigation.navigate("ResetPassword");
  };
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       //navigation.replace("Home");
  //     }
  //   });

  //   return unsubscribe;
  // }, []);
  return (
    <Screen style={{ padding: 10, marginTop: 5 }}>
      <Image
        source={logo}
        style={{ width: 166, height: 212, alignSelf: "center" }}
      />
      <ScreenTitle title="Login" />
      <ScreenSubtitle subtitle="Please enter your details" />
      <AppTextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <AppTextInput
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <View style={styles.organizertwo}>
        <Links
          style={styles.link}
          link="Forgot Password?"
          onPress={ResetPassword}
        />
      </View>
      <AppButton title="Login" onPress={handleLogin} />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.text}>Don't have an account? </Text>
        <Links style={styles.link} link="Sign up" onPress={SignupPressed} />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 15,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "lightgrey" }} />
        <View>
          <Text
            style={{
              width: 105,
              textAlign: "center",
              color: "darkgray",
              fontSize: 14,
            }}
          >
            Or login with
          </Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "lightgrey" }} />
      </View>
      <View style={styles.rowContainer}>
        <FontAwesome
          name="facebook-square"
          size={30}
          style={{
            color: "#3b5998",
            fontSize: 50,
            alignSelf: "center",
            paddingVertical: 10,
          }}
          onPress={() => console.log("Facebook")}
        />
        <FontAwesome
          name="twitter-square"
          size={30}
          style={{
            color: "#00acee",
            fontSize: 50,
            paddingHorizontal: 40,
            paddingVertical: 10,
          }}
          onPress={() => console.log("Facebook")}
        />
        <FontAwesome
          name="google"
          size={30}
          style={{
            color: "#db4a39",
            fontSize: 50,
            paddingVertical: 10,
          }}
          onPress={() => console.log("Facebook")}
        />
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
    alignItems: "flex-end",
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
  text: {
    color: colors.darkerGrey,
    fontSize: 16,
  },
  text2: {
    fontSize: 16,
    color: colors.darkGrey,
  },
});
