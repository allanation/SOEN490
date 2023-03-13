/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Screen from "../components/Screen";
import UtilBtn from "../components/UtilBtn";
import Event from "../components/Event";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import SearchBar from "../components/SearchBar";
import colors from "../config/colors";

import { format } from "date-fns";

export const convertStartDate = (number) => {
  return number ? format(new Date(number), "LLL dd, yyyy") : "";
};

export const getTodayDate = () => {
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
  return "Today's " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
};

function AttendeeDashboard() {
  const navigation = useNavigation();

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
    const q = query(
      collection(db, "events"),
      where("eventStatus", "==", "Approved")
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setAllEvents(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setMasterData(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setPreviousData(
          querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
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
  const [filteredUserData, setFilteredUserData] = useState("");

  const ItemView = ({ item }) => {
    return (
      <Event
        image={item.coverImage}
        title={item.eventName}
        organizer={item.orgName}
        date={convertStartDate(item.startDate)}
        coverImageName={item.coverImage}
        id={item.id}
        onPress={() => navigation.navigate("AttendeeView", { prop: item })}
      />
    );
  };

  const searchFilter = (text) => {
    if (text && displayedEvent) {
      const newData = masterData.filter((item) => {
        const itemData = item.eventName
          ? item.eventName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const userSearch = masterData.filter((item) => {
        const itemData = item.orgName
          ? item.orgName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredUserData(userSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else if (text && !displayedEvent) {
      const newData = previousData.filter((item) => {
        const itemData = item.eventName
          ? item.eventName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const userSearch = previousData.filter((item) => {
        const itemData = item.orgName
          ? item.orgName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredUserData(userSearch);
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

  var tabs;
  var showEvents;

  showEvents = (
    <>
      <FlatList
        data={filteredData ? filteredData : allEvents}
        renderItem={ItemView}
      />
      <FlatList
        data={filteredUserData ? filteredUserData : []}
        renderItem={ItemView}
      />
    </>
  );

  return (
    <Screen style={{ padding: 20, marginTop: 10 }}>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <View>
              <Text style={{ color: colors.darkGrey, marginBottom: 8 }}>
                <Text>{getTodayDate()}</Text>
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                {welcome}
              </Text>
              <View style={styles.eventTabs}>{tabs}</View>
            </View>
            <UtilBtn
              style={{ flexDirection: "row", size: 12, marginTop: 5 }}
              icon="notifications"
              iconSize={32}
              onPress={() => navigation.navigate("AttendeeNotifications")}
              testID="notification"
            />
          </View>

          <View style={styles.searchBar}>
            <SearchBar
              placeholder="Search for event..."
              handleChange={(text) => {
                searchFilter(text);
              }}
            />
            <UtilBtn
              iconSize={32}
              style={[
                styles.button,
                { flexDirection: "row", marginLeft: "2%", marginTop: "0.5%" },
              ]}
              icon="ios-options"
              testID="filters"
              onPress={() => console.log("Filters")}
            />
          </View>
          <Text style={styles.text}>Popular Events</Text>
        </View>
        {showEvents}
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
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  date: {
    color: "#969696",
    marginTop: "5%",
    fontSize: 12,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  text: {
    color: "#100101",
    marginTop: "4%",
    marginBottom: "3%",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    left: "2.5%",
    marginTop: "5%",
    flex: 1,
    marginBottom: "45%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default AttendeeDashboard;
