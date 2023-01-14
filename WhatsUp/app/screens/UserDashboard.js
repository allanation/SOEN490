import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import NavButton from "../components/NavButton";
import Event from "../components/Event";
import UtilBtn from "../components/UtilBtn";
import School from "../assets/Icons/stringio.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import SearchBar from "react-native-dynamic-search-bar";
import { Ionicons } from "@expo/vector-icons";

function UserDashboard() {
  const [search, setSearch] = useState("");
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
        <UtilBtn
          icon="pin"
          iconSize={18}
          title="Montreal, QC"
          testID="location"
        />
          <UtilBtn
            style={{ position: "absolute", right: 16 }}
            icon="notifications"
            iconSize={24}
            title=""
            onPress={() => console.log("Notification")}
            testID="notification"
          />
        </View>

        <Text style={styles.date}>{today}</Text>

        <Text style={styles.title}>{welcome}</Text>

        <View style={{ flexDirection: "row" }}>
          <SearchBar
            style={{ width: "85%", marginTop: 15 }}
            placeholder="Search for..."
            onChangeText={(text) => {
              // searchFilter(text);  <-- !!! to be fixed !!!
            }}
            // Icon={{ visible: searchText.length > 0 }}
          />
          <UtilBtn
            iconSize={32}
            style={[
              styles.button,
              { flexDirection: "row", paddingHorizontal: 12, marginTop: 15 },
            ]}
            icon="ios-options"
            onPress={() => console.log("Filters")}
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
    marginTop: 10
  },
  date: {
    color: "#969696",
    marginTop: "3%",
    fontSize: 16,
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
