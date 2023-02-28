/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import TitleHeaders from "../components/TitleHeaders";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Notification from "../components/Notifications";
import { useNavigation } from "@react-navigation/native";
import logo from "../Images/w3.png";

function OrgNotifications() {
  const navigation = useNavigation();
  const [orgEvents, setOrgEvents] = useState();
  const [user] = useAuthState(auth);

  const getEvents = async () => {
    const allEvents = [];
    const q = query(
      collection(db, "events"),
      where("pocEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        allEvents.push(doc.data());
      });
      setOrgEvents(allEvents);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Notification
        title={item.eventName}
        status={item.eventStatus}
        onPress={() => navigation.navigate("OrgView", { prop: item })}
      />
    );
  };

  useEffect(() => {
    getEvents();
  }, []);

  var showEvents;

  showEvents = orgEvents ? (
    <>
      <FlatList data={orgEvents} renderItem={ItemView} style={{}} />
    </>
  ) : (
    <></>
  );

  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <TitleHeaders
        style={{ alignSelf: "left", paddingBottom: 20 }}
        title={"Notifications"}
      />
      <View>{showEvents}</View>
    </Screen>
  );
}

export default OrgNotifications;
