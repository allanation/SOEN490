/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import UtilBtn from "../components/UtilBtn";
import Blast from "../components/Blast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { convertStartDate } from "./AttendeeDashboard.js";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { format } from "date-fns";

function AttendeeNotifications() {
  const navigation = useNavigation();

  const [allBlasts] = useState([]);
  const [allBooked] = useState([]);
  const [times] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [user] = useAuthState(auth);

  const getBookmarksAndTickets = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        const ticketsField = doc.data().tickets;
        let ticket;
        for (ticket of ticketsField) {
          if (!allBooked.includes(ticket)) {
            allBooked.push(ticket);
          }
        }
        const bookedField = doc.data().bookMarks;
        let books;
        for (books of bookedField) {
          if (!allBooked.includes(books)) {
            allBooked.push(books);
          }
        }
      });
    }
  };

  const getBlasts = async () => {
    const q = query(
      collection(db, "events"),
      where("eventStatus", "==", "Approved")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        for (const books of allBooked) {
          if (books == doc.id) {
            const notifs = doc.data().notifications;
            if (!(notifs === undefined)) {
              for (const notif of notifs) {
                const temp = {
                  coverImage: doc.data().coverImage,
                  eventName: doc.data().eventName,
                  dateSent: notif.dateSent,
                  message: notif.message,
                  link: doc.data(),
                };
                if (!times.includes(temp.dateSent)) {
                  times.push(temp.dateSent);
                  allBlasts.push(temp);
                }
              }
            }
          }
        }
      });
    }
  };

  allBlasts.sort(function (a, b) {
    const keyA = a.dateSent,
      keyB = b.dateSent;
    return keyA < keyB ? 1 : keyA > keyB ? -1 : 0;
  });

  async function bookmarkAndgetBlasts() {
    await getBookmarksAndTickets();
    await getBlasts();
  }

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    bookmarkAndgetBlasts();
  }, []);

  const ItemView = ({ item }) => {
    return (
      <Blast
        image={item.coverImage}
        title={item.eventName}
        date={
          convertStartDate(item.dateSent) +
          format(new Date(item.dateSent), " H:mm")
        }
        message={item.message}
        coverImageName={item.coverImage}
        id={item.id}
        onPress={() => navigation.navigate("AttendeeView", { prop: item.link })}
      />
    );
  };

  const pullMe = () => {
    setRefresh(true);
    bookmarkAndgetBlasts();
    setTimeout(() => {
      setRefresh(false);
    }, 1000);
  };

  const showNotifications = (
    <FlatList
      data={allBlasts}
      renderItem={ItemView}
      refreshControl={
        <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
      }
    />
  );

  return (
    <Screen style={{ padding: 10, backgroundColor: "#F5F5F5" }}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.title}>Notifications</Text>
        <UtilBtn
          icon="home-outline"
          iconSize={25}
          title=""
          style={styles.btn}
          onPress={() => navigation.goBack()}
          testID="Home"
        />
      </View>
      {showNotifications}
      <Text style={styles.textCentered}>Pull Twice To Refresh...</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#100101",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 30,
    marginLeft: 15,
  },
  btn: {
    position: "absolute",
    marginTop: 30,
    right: "2%",
    shadowOffset: { height: 0, width: 0 }, // IOS
    shadowOpacity: 0, // IOS
    shadowRadius: 0, //IOS
    elevation: 0, // Android
  },
  textCentered: {
    color: "#100101",
    marginTop: "4%",
    marginBottom: "3%",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default AttendeeNotifications;
