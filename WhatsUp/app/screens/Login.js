/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, Image, Alert, Animated, Easing } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import ScreenTitle from "../components/ScreenTitle";
import logo from "../Images/w3.png";
import FontAwesome from "react-native-vector-icons/SimpleLineIcons";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOrganizer] = useState(false);
  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then(async () => {
        const q = query(collection(db, "users"), where("email", "==", email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot != null) {
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            if (isOrganizer == doc.data().isOrganizer) {
              navigation.navigate("UserDashboard");
            } else {
              navigation.navigate("Organizer");
            }
          });
        }
      })
      .catch(() => {
        Alert.alert("Try again", "Invalid email or password.");
      });
  };
  const SignupPressed = async () => {
    navigation.navigate("SignUp");
  };

  const ResetPassword = () => {
    navigation.navigate("ResetPassword");
  };
  return (
    <Screen style={{ paddingHorizontal: '10%', marginTop: 10 }}>
      <Image
        source={logo}
        style={{ width: 166, height: 212, alignSelf: "center"}}
      />
      <ScreenTitle style={{ fontSize: 38,}} title="Login" isTitle={true} /> 
      <AppTextInput
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text.toLowerCase())}
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
        <SimpleLineIcons
          name="social-facebook"
          size={30}
          style={{
            color: colors.secondary,
            fontSize: 30,
            alignSelf: "center",
            paddingVertical: 10,
          }}
          onPress={() => console.log("Facebook")}
          testID="facebook"
        />
        <SimpleLineIcons
          name="social-twitter"
          size={30}
          style={{
            color: colors.secondary,
            fontSize: 30,
            paddingHorizontal: 40,
            fontSize: 30,
            alignSelf: "center",
          }}
          onPress={() => console.log("Facebook")}
          testID="twitter"
        />
        <SimpleLineIcons
          name="social-google"
          size={30}
          style={{
            color: colors.secondary,
            fontSize: 30,
            paddingVertical: 10,
          }}
          onPress={() => console.log("Facebook")}
          testID="google"
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
