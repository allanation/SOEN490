/* eslint-disable no-undef */
/* eslint-disable react/no-children-prop */
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  Text,
} from "react-native";
import Screen from "../components/Screen";
import TitleHeaders from "../components/TitleHeaders";
import { Ionicons } from "@expo/vector-icons";
import logo from "../Images/w3.png";
import ImgOrgBottom from "../components/ImgOrgBottom";
import colors from "../config/colors";
import AppModal from "../components/AppModal";
import UtilBtn from "../components/UtilBtn";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { sendPasswordResetEmail, updateEmail, signOut } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

function UserProfile() {
  const navigation = useNavigation();
  const [modalVisibleName, setModalVisibleName] = useState(false);
  const [modalVisibleEmail, setModalVisibleEmail] = useState(false);
  const [setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [docKey, setDocKey] = useState("");
  const [userName, setUserName] = useState("");
  const [user] = useAuthState(auth);

  const getName = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().firstName + " " + doc.data().lastName);
      });
    }
  };

  const getKey = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setDocKey(doc.id);
      });
    }
  };

  getName();
  getKey();

  const updateFirestoreEmail = async () => {
    const docRef = doc(db, "users", docKey);
    const data = {
      email: newEmail,
    };
    await updateDoc(docRef, data)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const updateEmailForCurrentUser = () => {
    updateEmail(user, newEmail)
      .then(() => {})
      .catch(() => {});
  };

  const sendResetEmail = () => {
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        Alert.alert(
          "Email sent sucessfully.",
          "Check your emails to reset the password."
        );
      })
      .catch(() => {});
  };

  const checkIfEmailExists = () => {
    fetchSignInMethodsForEmail(auth, user.email)
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
        Alert.alert(error.message);
      });
  };

  const checkIfEmailAlreadyExists = () => {
    fetchSignInMethodsForEmail(auth, newEmail)
      .then((result) => {
        if (result === undefined || result.length == 0) {
          Alert.alert("Email was successfully updated.");
          updateEmailForCurrentUser(newEmail);
        } else {
          Alert.alert("The email already exists.");
        }
      })
      .catch((error) => {
        console.log(error.message);
        Alert.alert(error.message);
      });
  };

  const logOut = () => {
    navigation.navigate("Login");
    signOut(auth).then(function() {
      Alert.alert("You have been logged out.");
    });
  };

  return (
    <Screen style={{ padding: 20, backgroundColor: "#F5F5F5" }}>
      <View style={{ left: "1.5%", marginTop: "5%" }}>
        <TitleHeaders title="Profile" style={{ marginBottom: "2%" }} />

        <Image
          source={logo}
          style={{
            width: 166,
            height: 212,
            alignSelf: "center",
            marginTop: "5%",
          }}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            marginBottom: "2%",
            fontSize: 22,
            fontWeight: "bold",
            marginTop: "10%",
            marginLeft: "1%",
          }}
        >
          Name
        </Text>
      </View>
      <View>
        <Text
          style={{
            marginBottom: "2%",
            marginTop: "0.5%",
            marginLeft: "1%",
            fontSize: 16,
          }}
        >
          {userName}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            marginBottom: "2%",
            fontSize: 22,
            fontWeight: "bold",
            marginTop: "5%",
            marginLeft: "1%",
          }}
        >
          Email
        </Text>
        <Ionicons
          name="pencil"
          onPress={() => setModalVisibleEmail(true)}
          size={20}
          color={colors.primary}
          style={{
            marginBottom: "2%",
            marginTop: "5%",
            alignSelf: "flex-end",
            marginLeft: "auto",
          }}
        />
      </View>
      <View>
        <Text
          style={{
            marginBottom: "2%",
            marginTop: "0.5%",
            marginLeft: "1%",
            fontSize: 16,
          }}
        >
          {user.email}
        </Text>
        <Text
          style={{
            marginBottom: "2%",
            fontSize: 22,
            fontWeight: "bold",
            marginTop: "5%",
            marginLeft: "1%",
          }}
        >
          Password
        </Text>
        <Pressable
          onPress={checkIfEmailExists}
          children={({ pressed }) => (
            <Text
              style={{
                color: pressed ? "#FF9E00" : colors.primary,
                marginLeft: "1%",
                marginTop: "0.5%",
                fontSize: 16,
              }}
            >
              Change Password
            </Text>
          )}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Ionicons
          name="log-out"
          style={{
            fontSize: 28,
            marginTop: 80,
            alignSelf: "flex-end",
            marginLeft: "auto",
          }}
          color={colors.lightGrey}
          onPress={() =>
            Alert.alert("Log out", "You will be returned to the login screen.", [
              {
                text: "Cancel",
                style: "cancel",
              },
              { text: "Log out", onPress: () => logOut() },
            ])
          }
        />
      </View>
      <ImgOrgBottom resizeMode="contain" />
      <AppModal
        animationType="slide"
        transparent={true}
        visible={modalVisibleName}
        onRequestClose={() => {
          setModalVisibleName(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <UtilBtn
            style={{ opacity: 1 }}
            icon="chevron-back"
            onPress={() => setModalVisibleName(!modalVisibleName)}
          />
          <View style={styles.inputView}>
            <ScrollView
              keyboardDismissMode="interactive"
              style={{ width: "100%" }}
            >
              <TitleHeaders
                style={{
                  alignSelf: "center",
                  fontSize: 22,
                  marginBottom: "5%",
                }}
                title={"Enter New Name:"}
              />
              <AppTextInput
                placeholder="Name"
                onChangeText={(currentName) => setNewName(currentName)}
              />
              <AppButton
                title="Submit"
                style={{ marginTop: 0 }}
                onPress={() => {
                  setModalVisibleName(!modalVisibleName);
                }}
              />
            </ScrollView>
          </View>
        </View>
      </AppModal>
      <AppModal
        animationType="slide"
        transparent={true}
        visible={modalVisibleEmail}
        onRequestClose={() => {
          setModalVisibleName(!modalVisibleName);
        }}
      >
        <View style={styles.modalView}>
          <UtilBtn
            title=""
            style={{ opacity: 1 }}
            icon="chevron-back"
            onPress={() => setModalVisibleEmail(!modalVisibleEmail)}
          />
          <View style={styles.inputView}>
            <ScrollView
              keyboardDismissMode="interactive"
              style={{ width: "100%" }}
            >
              <TitleHeaders
                style={{
                  alignSelf: "center",
                  fontSize: 22,
                  marginBottom: 10,
                }}
                title={"Enter New Email:"}
              />
              <AppTextInput
                placeholder="Email"
                onChangeText={(newEmail) => {
                  setNewEmail(newEmail);
                }}
              />
              <AppButton
                title="Submit"
                style={{ marginTop: 15 }}
                onPress={() => {
                  setModalVisibleEmail(!modalVisibleEmail);
                  checkIfEmailAlreadyExists();
                  updateFirestoreEmail(newEmail);
                }}
              />
            </ScrollView>
          </View>
        </View>
      </AppModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 270,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 20,
    paddingTop: 20,
    width: "86%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputView: {
    marginTop: 8,
    borderColor: colors.lightGrey,
    borderRadius: 7,
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
  },
});

export default UserProfile;
