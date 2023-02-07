import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";
import Links from "../components/Links";
import Screen from "../components/Screen";
import TitleHeaders from "../components/TitleHeaders";
import Checkbox from "expo-checkbox";
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
} from "../firebase";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import ImgOrgBottom from "../components/ImgOrgBottom";

function SignUpScreen() {
  // Use the `useNavigation` hook to access the navigation object
  // for the current screen
  const navigation = useNavigation();

  // Initialize the state variables for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [valid, setValid] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  // Define a function to handle the sign up process
  const handleSignUp = async (
    firstName,
    lastName,
    email,
    password,
    isOrganizer
  ) => {
    // Check that the first name field is not empty
    if (firstName.length == 0) {
      Alert.alert("Error", "Please fill out your first name.");
      return;
    }

    // Check that the last name field is not empty
    if (lastName.length == 0) {
      Alert.alert("Error", "Please fill out your last name.");
      return;
    }

    // Attempt to create a new user account with the provided email and password
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // If the account is created successfully, navigate to the login screen
        // and add the user's details to the Firebase database
        Alert.alert("Account Created Succesfully");
        navigation.navigate("Login");
        return addDoc(collection(db, "users"), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          isOrganizer: isOrganizer,
        });
      })
      .catch((error) => {
        // If any errors occur during the sign up process, display an alert
        // with more information about the error
        return handleErrorMsg(error);
      });
  };

  const handleErrorMsg = (error) => {
    // Check error message and show corresponding alert
    if (error.message.includes("missing-email")) {
      Alert.alert("Error", "Please fill in an email");
    } else if (error.message.includes("invalid-email")) {
      Alert.alert("Error", "Invalid Email");
    } else if (error.message.includes("email-already-in-use")) {
      Alert.alert("Error", "Email already in use");
    } else if (error.message.includes("internal-error")) {
      Alert.alert("Error", "Please fill in a password");
    } else if (error.message.includes("weak-password")) {
      Alert.alert("Error", "Passwords must be at least 6 characters.");
    }
    // Log error message for debugging purposes
    console.log(error.message);
  };

  const handleConfirmPass = (confirmPassword) => {
    // Set value of confirm password and check if it matches password
    setConfirmPassword(confirmPassword);
    if (confirmPassword.length > 0) {
      if (confirmPassword !== password) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  };

  const handlePassword = (password) => {
    // Set value of password and check if it matches confirm password
    setPassword(password);
    if (password.length > 0) {
      if (password !== confirmPassword) {
        setValid(false);
      } else {
        setValid(true);
      }
    }
  };

  return (
    <Screen style={{ padding: 20, marginTop: "2%" }}>
      <View style={{ height: "90%", paddingBottom: "20%" }}>
        <TitleHeaders title="Sign Up" style={{ marginBottom: "2%" }} />
        <TitleHeaders
          title="Please fill the following information"
          isTitle={false}
          style={{ marginBottom: "2%" }}
        />
        <AppTextInput
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
        />
        <AppTextInput
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
        />
        <AppTextInput
          placeholder="Email"
          onChangeText={(text) => setEmail(text.toLowerCase())}
          keyboardType="email-address"
        />
        <AppTextInput
          placeholder="Password"
          onChangeText={(text) => handlePassword(text)}
          secureTextEntry
        />
        <AppTextInput
          placeholder="Confirm Password"
          onChangeText={(text) => handleConfirmPass(text)}
          secureTextEntry
          style={!valid ? styles.invalidInput : styles.validInput}
        />
        <View style={{ flexDirection: "row", paddingTop: 16 }}>
          <View style={styles.organizer}>
            <Text style={styles.text}>Are you an organizer?</Text>
          </View>
          <View style={styles.organizertwo}>
            <Checkbox
              style={styles.check}
              value={isOrganizer}
              onValueChange={setIsOrganizer}
              testID="isOrganizer"
            />
          </View>
        </View>
        <AppButton
          testID={"signUpButton"}
          style={{
            shadowColor: "black", // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 0.2, // IOS
            shadowRadius: 3, //IOS
            elevation: 4, // Android
            marginTop: "20%",
          }}
          title="Sign Up"
          disabled={!valid}
          onPress={() =>
            handleSignUp(firstName, lastName, email, password, isOrganizer)
          }
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={styles.text}>Already have an account? </Text>
          <Links
            style={styles.link}
            link="Login"
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
      <ImgOrgBottom resizeMode="contain" />
    </Screen>
  );
}
``;
const styles = StyleSheet.create({
  organizer: {
    alignItems: "flex-start",
    width: "50%",
    color: colors.lightGrey,
  },
  organizertwo: {
    alignItems: "flex-end",
    width: "50%",
  },
  check: {
    borderRadius: 6,
    borderWidth: 1,
  },
  validInput: {
    borderColor: colors.lightGrey,
  },
  invalidInput: {
    borderColor: colors.secondary,
  },
  text: {
    color: colors.darkerGrey,
    fontSize: 16,
  },
});

export default SignUpScreen;
