import React from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import ScreenSubtitle from "../components/ScreenSubtitle";
import ScreenTitle from "../components/ScreenTitle";
import logo from "../Images/w3.png";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function Login() {
  return (
    <Screen>
      <Image
        source={logo}
        style={{ width: 166, height: 212, alignSelf: "center" }}
      />
      <ScreenTitle title="Login" />
      <ScreenSubtitle subtitle="Please enter your details" />
      <AppTextInput
        placeholder="Email"
        keyboardType="email-address"
        secureTextEntry={false}
      />
      <AppTextInput placeholder="Password" secureTextEntry={true} />
      <View style={styles.organizertwo}>
        <Links
          style={styles.link}
          link="Forget Password?"
          onPress={() => console.log("password")}
        />
      </View>
      <AppButton style title="Login" onPress={() => console.log("SOEN490")} />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={styles.text}>
          Don't have an account?
          <Links
            style={styles.link}
            link="Sign up"
            onPress={() => console.log("Sign up")}
          />
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 30,
        }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
        <View>
          <Text style={{ width: 90, textAlign: "center" }}>Or login with</Text>
        </View>
        <View style={{ flex: 1, height: 1, backgroundColor: "grey" }} />
      </View>
      {/* <View style={styles.roundshape}>
        <AntDesign
          name="facebook-square"
          size={30}
          style={{
            color: "#3b5998",
            fontSize: 50,
            alignSelf: "center",
          }}
          onPress={() => console.log("Facebook")}
        />
      </View> */}
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
  link: {},
});
