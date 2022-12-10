import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import Search from "../components/Search";
import SmallButton from "../components/SmallButton";
import NavButton from "../components/NavButton";
import Event from "../components/Event";
import FilterButton from "../components/FilterButton";
import School from "../assets/Icons/stringio.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

function UserDashboard() {
  const navigation = useNavigation();
  var date = new Date();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var today = "Today's " + months[date.getMonth()] + " " + date.getDate();

  const [userName, setUserName] = useState("");
  const [user] = useAuthState(auth);

  const getName = async () => {
    const q = query(collection(db, "users"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().firstName);
      });
    }
  };

  getName();

  function getEvents() {
    let eventsInfo = [];
    for (let i = 0; i <= 5; i++) {
      const event = {
        image: { School },
        title: "Orientation Week",
        organizer: "Concordia University",
        date: "May 21, 2022",
        key: i,
      };
      eventsInfo[i] = event;
    }
    return eventsInfo;
  }

  var welcome = "Welcome, " + userName + "!";

  const events = getEvents();

  // eslint-disable-next-line no-unused-vars
  const Tab = createBottomTabNavigator();

  return (
    <Screen style={{ padding: 20, backgroundColor: "#F5F5F5" }}>
      <View style={{ left: "1.5%", marginTop: "5%", marginBottom: "40%" }}>
        <View style={{ flexDirection: "row" }}>
          <SmallButton
            image="pin"
            title="Location, QC"
            onPress={() => console.log("Location")}
            size={"8%"}
            testID="location"
          />
          <View style={{ position: "absolute", right: "4%" }}>
            <SmallButton
              image="notifications"
              title=""
              onPress={() => console.log("Notification")}
              size={4}
              testID="notification"
            />
          </View>
        </View>

        <Text style={styles.date}>{today}</Text>

        <Text style={styles.title}>{welcome}</Text>

        <View style={{ flexDirection: "row" }}>
          <Search placeholder="Search for..." />
          <FilterButton
            image="ios-options"
            onPress={() => console.log("Filters")}
            title=""
          />
        </View>

        <Text style={styles.text}>Popular Events</Text>

        <ScrollView style={{ width: "101%" }}>
          {events.map((n) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <Event
                image={School}
                title={n.title}
                organizer={n.organizer}
                date={n.date}
                onPress={() => console.log("Event")}
                key={n.key}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.container}>
        <NavButton
          image="ios-home-outline"
          onPress={() => console.log("Home")}
          title=""
        />
        <NavButton
          image="ios-barcode-outline"
          onPress={() => console.log("Ticket")}
          title=""
        />
        <NavButton
          image="ios-bookmark-outline"
          onPress={() => console.log("Bookmark")}
          title=""
        />
        <NavButton
          image="ios-person-outline"
          onPress={() => navigation.navigate("UserProfile")}
          title=""
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
    alignItems: "flex-start",
    width: "30%",
  },
  title: {
    color: "#100101",
    fontSize: 20,
    fontWeight: "bold",
  },
  date: {
    color: "#969696",
    marginTop: "6%",
    fontSize: 12,
  },
  text: {
    color: "#100101",
    marginTop: "6%",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    position: "absolute",
    bottom: "-1.4%",
    backgroundColor: "#FFFFFF",
    borderColor: "#969696",
    paddingHorizontal: "10%",
    width: "113%",
    height: "7%",
    marginVertical: "1.4%",
    borderStyle: "solid",
    borderWidth: 0.25,
    shadowColor: "black",
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
  },
});

export default UserDashboard;
