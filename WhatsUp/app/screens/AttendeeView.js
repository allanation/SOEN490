/* eslint-disable no-unused-vars */
import { StyleSheet, View, Image, Text, Linking } from "react-native";
import Screen from "../components/Screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AttendeeDetails from "./AttendeeDetails";
import AttendeeSchedule from "./AttendeeSchedule";
import colors from "../config/colors";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UtilBtn from "../components/UtilBtn";
import AppButton from "../components/AppButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import {
  updateDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

AttendeeView.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.any,
};

export const getCoverImageSource = (coverImageName) => {
  if (coverImageName == "Art") {
    coverImageName = require("../assets/CoverImages/Art.jpg");
  } else if (coverImageName == "Auditorium") {
    coverImageName = require("../assets/CoverImages/Auditorium.jpg");
  } else if (coverImageName == "Concordia") {
    coverImageName = require("../assets/CoverImages/Concordia.jpg");
  } else if (coverImageName == "Frosh") {
    coverImageName = require("../assets/CoverImages/Frosh.jpg");
  } else if (coverImageName == "Graduation") {
    coverImageName = require("../assets/CoverImages/Graduation.jpg");
  } else if (coverImageName == "McGill") {
    coverImageName = require("../assets/CoverImages/McGill.jpeg");
  } else if (coverImageName == "Park") {
    coverImageName = require("../assets/CoverImages/Park.jpg");
  } else if (coverImageName == "Sports") {
    coverImageName = require("../assets/CoverImages/Sports.jpg");
  } else if (coverImageName == "Studying") {
    coverImageName = require("../assets/CoverImages/Studying.jpg");
  }
  return coverImageName;
};

function AttendeeView({ route, navigation }) {
  const { prop } = route.params;
  const { fromScreen } = route.params;
  const Tab = createMaterialTopTabNavigator();
  const [user] = useAuthState(auth);
  const [test, setTest] = useState({
    buttonText: "Going",
    checkedButton: "✔ Going",
  });
  const [docId, setDocId] = useState("");

  const getDocId = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setDocId(doc.id);
      });
    }
  };

  const handleGoing = async (test) => {
    if (test == "Going") {
      setTest({ buttonText: "✔ Going", checkedButton: "✔ Going" });
      const setToGoing = doc(db, "users", docId);
      await updateDoc(setToGoing, {
        tickets: arrayUnion(prop.id),
      });
    } else {
      setTest({ buttonText: "Going", checkedButton: "Going" });
      const notGoing = doc(db, "users", docId);
      await updateDoc(notGoing, {
        tickets: arrayRemove(prop.id),
      });
    }
  };

  useEffect(() => {
    getDocId();
  }, []);

  return (
    <Screen style={{ backgroundColor: "white" }}>
      <Image
        source={getCoverImageSource(prop.coverImage)}
        resizeMode="cover"
        style={styles.headerImage}
      />

      <View style={styles.toolContainer}>
        <UtilBtn
          icon="chevron-back-outline"
          iconSize={25}
          style={styles.toolBtn}
          onPress={() => navigation.goBack()}
        />
        <UtilBtn
          icon="ios-bookmark-outline"
          iconSize={20}
          style={styles.toolBtn}
        >
          {" "}
        </UtilBtn>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            width: "35%",
            marginRight: "5%",
            marginLeft: "5%",
          },
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            marginHorizontal: "10%",
          },
        }}
      >
        <Tab.Screen
          name="Details"
          component={AttendeeDetails}
          initialParams={{ prop: prop }}
        />
        <Tab.Screen
          name="Schedule"
          component={AttendeeSchedule}
          initialParams={{ prop: prop.itinerary }}
        />
      </Tab.Navigator>
      <View
        style={{
          height: "10%",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: "5%",
          borderTopColor: "silver",
          borderTopWidth: 1,
        }}
      >
        {prop.link.length > 0 ? (
          <AppButton
            style={styles.btn}
            title="Buy Tickets"
            onPress={() => {
              Linking.openURL(prop.link);
            }}
          />
        ) : (
          <Text></Text>
        )}
        {fromScreen == "AttendeeTickets" ? (
          <AppButton
            style={styles.btn}
            title={test.checkedButton}
            onPress={() => {
              handleGoing(test.checkedButton);
            }}
          />
        ) : (
          <AppButton
            style={styles.btn}
            title={test.buttonText}
            onPress={() => {
              handleGoing(test.buttonText);
            }}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "35%",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -50,
  },
  btn: {
    borderRadius: 3,
    marginRight: 10,
    height: "63%",
    width: "auto",
    alignItems: "center",
  },
  toolContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    marginTop: 70,
    width: "100%",
    paddingHorizontal: "10%",
  },
  toolBtn: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
});

export default AttendeeView;
