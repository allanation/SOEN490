/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import UtilBtn from "../components/UtilBtn";
import Blast from "../components/Blast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

import { format } from "date-fns";

const convertStartDate = (number) => {
  return number ? format(new Date(number), "dd/LL/yyyy H:mm") : "";
};

function AttendeeNotifications() {
    const navigation = useNavigation();

      const [allBlasts, setAllBlasts] = useState([]);
      const [allBooked, setAllBooked] = useState([]);
      const [allNotifications, setAllNotifications] = useState([]);
      const [times, setTimes] = useState([]);
      const [user] = useAuthState(auth);

      const getBookmarksAndTickets = async () => {
        const q = query(collection(db, "users"), where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        if (querySnapshot != null) {
            querySnapshot.forEach((doc) => {
                const ticketsField = doc.data().tickets;
                for (ticket of ticketsField){
                    if (!allBooked.includes(ticket)){
                        allBooked.push(ticket);
                    }
                }
                const bookedField = doc.data().bookMarks;
                for (books of bookedField){
                    if (!allBooked.includes(books)){
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
                for (const books of allBooked){
                    const notifs = doc.data().notifications;
                    if (!(notifs === undefined)){
                        for (const stuff of notifs){
                            const temp ={
                                coverImage: doc.data().coverImage,
                                eventName: doc.data().eventName,
                                dateSent: stuff.dateSent,
                                message: stuff.message,
                                link: doc.data(),
                            };
                            if (!times.includes(temp.dateSent)){
                                times.push(temp.dateSent);
                                allBlasts.push(temp);
                            }
                        }
                    }
                }
            });
        }
      };

      allBlasts.sort(function(a, b) {
        const keyA = a.dateSent, keyB = b.dateSent;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });

      useEffect(() => {
        console.log("useEffect used");
        getBookmarksAndTickets();
        getBlasts();
      }, []);

      const ItemView = ({ item }) => {
        return (
          <Blast
            image={item.coverImage}
            title={item.eventName}
            date={convertStartDate(item.dateSent)}
            message = {item.message}
            coverImageName={item.coverImage}
            id={item.id}
            onPress={() => navigation.navigate("AttendeeView", { prop: item.link })}
          />
        );
      };

      const showNotifications = (
          <FlatList
            data={allBlasts}
            renderItem={ItemView}
          />
      );

    return (
        <Screen style={{ padding: 10, backgroundColor: "#F5F5F5" }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.title}>Notifications</Text>
                <UtilBtn
                    icon="home-outline"
                    iconSize={35}
                          title=""
                          style={styles.btn}
                          onPress={() => navigation.goBack()}
                          testID="Home"
                        />
            </View>

            {showNotifications}

        </Screen>
    )
}

const styles = StyleSheet.create({
  title: {
    color: "#100101",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  btn: {
      position: "absolute",
      right: 16,
      shadowOffset: { height: 0, width: 0 }, // IOS
      shadowOpacity: 0, // IOS
      shadowRadius: 0, //IOS
      elevation: 0, // Android
    },
});

export default AttendeeNotifications;