/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect } from "react";
import Screen from "../components/Screen";
import TitleHeaders from "../components/TitleHeaders";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Notification from "../components/Notifications";

function OrgNotifications() {
  const [orgEvents, setOrgEvents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [user] = useAuthState(auth);

  const getEvents = async () => {
    const allEvents = [];
    const q = query(
      collection(db, "events"),
      where("pocEmail", "==", user.email),
      where("eventStatus", "in", ["Approved", "Rejected"])
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
        id={item.id}
        statusChangeDate={item.statusChangeDate}
        onPress={() => deleteNotifs(item.guid)}
      />
    );
  };

  const deleteNotifs = (id) => {
    for (const event of orgEvents) {
      console.log(event.guid + "    " + id);
      if (event.guid == id) {
        console.log(orgEvents.indexOf(event));
        orgEvents.splice(orgEvents.indexOf(event), 1);
      }
    }
  };

  useEffect(() => {
    getEvents();
    console.log(orgEvents);
  }, []);

  const pullMe = () => {
    setRefresh(true);
    deleteNotifs();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  var showEvents;

  showEvents = orgEvents ? (
    <>
      <FlatList
        data={orgEvents}
        renderItem={ItemView}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      />
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
