/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import EventBanner from "../components/EventBanner";
import SearchBar from "../components/SearchBar";
import EventImage from "../assets/stringio.jpg";
import { useNavigation } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import UtilBtn from "../components/UtilBtn";
import { convertStartDate } from "./UserDashboard";
import { format } from "date-fns/format";
import Event from "../components/Event";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function OrganizerDashboardScreen() {
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
  const [allEvents, setAllEvents] = useState([]);
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

  const getEvents = async () => {
    const allEvents = [];
    const q = query(collection(db, "events"), where("pocEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        allEvents.push(doc.data());
      });
      setAllEvents(allEvents);
      setMasterData(allEvents);
      setPreviousData(allEvents);
    }
  };

  var welcome = "Welcome, " + userName + "!";

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    getName();
    getEvents();
  }, []);

  const [displayedEvent, setDisplayedEvents] = useState(true);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [filteredData, setFilteredData] = useState("");
  const [filteredOrgData, setFilteredOrgData] = useState("");

  const ItemView = ({ item }) => {
    return (
      <Event
        image={item.coverImage}
        title={item.eventName}
        organizer={item.orgName}
        date={convertStartDate(item.startDate)}
        onPress={() => navigation.navigate("OrgView", { prop: item })}
      />
    );
  };

  const searchFilter = (text) => {
    if (text && displayedEvent) {
      const newData = masterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const orgSearch = masterData.filter((item) => {
        const itemData = item.organizer
          ? item.organizer.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredOrgData(orgSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else if (text && !displayedEvent) {
      const newData = previousData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const orgSearch = previousData.filter((item) => {
        const itemData = item.organizer
          ? item.organizer.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredOrgData(orgSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else {
      displayedEvent
        ? setFilteredData(masterData)
        : setFilteredData(previousData);
      setSearch(text);
    }
  };

  const toggleDisplay = () => {
    setDisplayedEvents({ displayedEvent: !displayedEvent });
  };

  var tabs;
  var showEvents;
  if (displayedEvent) {
    tabs = (
      <>
        <TouchableOpacity
          title="Show Form 1"
          onPress={() => setDisplayedEvents(true)}
          style={styles.upcoming}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Show Form 2"
          onPress={() => setDisplayedEvents(false)}
          style={styles.previous}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Previous</Text>
        </TouchableOpacity>
      </>
    );
    showEvents = (
      <>
        <FlatList
          data={filteredData ? filteredData : allEvents}
          renderItem={ItemView}
          style={{}}
        />
        <FlatList
          data={filteredOrgData ? filteredOrgData : []}
          renderItem={ItemView}
        />
      </>
    );
  } else {
    tabs = (
      <>
        <TouchableOpacity
          title="Show Form 1"
          onPress={() => setDisplayedEvents(true)}
          style={styles.previous}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Show Form 2"
          onPress={() => setDisplayedEvents(false)}
          style={styles.upcoming}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Previous</Text>
        </TouchableOpacity>
      </>
    );
    showEvents = (
      <>
        <FlatList
          data={filteredData ? filteredData : allEvents}
          renderItem={ItemView}
        />
        <FlatList
          data={filteredOrgData ? filteredOrgData : []}
          renderItem={ItemView}
        />
      </>
    );
  }
  return (
    <Screen style={{ padding: 20, marginTop: 10 }}>
      <View>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={{ color: colors.darkGrey }}>
              <Text style={styles.paragraph}>{today}</Text>
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>{welcome}</Text>
          </View>
          <UtilBtn
            iconSize={40}
            style={[styles.button, { flexDirection: "row", size: 12 }]}
            icon="add-circle-outline"
            testID="addEventButton"
            onPress={() => navigation.navigate("NewEvent")}
          />
        </View>

        <View style={styles.searchBar}>
          <SearchBar
            placeholder="Search for..."
            handleChange={(text) => {
              searchFilter(text);
            }}
          />
          <UtilBtn
            iconSize={32}
            style={[styles.button, { flexDirection: "row", size: 12 }]}
            icon="ios-options"
            testID="filters"
            onPress={() => console.log("Filters")}
          />
        </View>
        <Text style={styles.eventTitle}>Your Events</Text>
      </View>
      {showEvents}
      <View style={styles.eventTabs}>{tabs}</View>
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
    width: "50%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 16,
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  filter: {
    justifyContent: "center",
  },
  eventTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 2,
  },
  upcoming: {
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 5,
    fontWeight: "bold",
  },
  previous: {
    marginTop: 5,
    paddingBottom: 5,
  },
});

export default OrganizerDashboardScreen;
