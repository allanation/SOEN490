/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import SearchBar from "../components/SearchBar";
import { useNavigation } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import UtilBtn from "../components/UtilBtn";
import { convertStartDate } from "./AttendeeDashboard.js";
import Event from "../components/Event";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventScreen from "./EventScreen";
import { getTodayDate } from "./AttendeeDashboard.js";

function OrganizerDashboardScreen() {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [previousEvents, setPreviousEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
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
      where("pocEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        allEvents.push(doc.data());
      });
      setAllEvents(allEvents);
      setUpcomingEvents(allEvents);

    }
  };

  var welcome = "Welcome, " + userName + "!";

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    getName();
    getEvents();
  }, []);
    
  return (
    <Screen style={{ padding: 20, marginTop: 10 }}>
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={{ color: colors.darkGrey }}>
                <Text style={styles.paragraph}>{getTodayDate()}</Text>
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                {welcome}
              </Text>
              <UtilBtn
              iconSize={40}
              style={[styles.button, { flexDirection: "row", size: 12 }]}
              icon="add-circle-outline"
              testID="addEventButton"
              onPress={() => navigation.navigate("NewEvent")}
            />
            </View>
            </View>
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
          name="Upcoming"
          component={EventScreen}
          initialParams={{ events: upcomingEvents }}
        />
        <Tab.Screen
          name="Previous"
          component={EventScreen}
          initialParams={{ events: previousEvents }}
        />
      </Tab.Navigator>
      
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
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 5,
  },
  upcoming: {
    marginTop: 5,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
    paddingBottom: 5,
    fontWeight: "bold",
    marginLeft: "20%",
  },
  previous: {
    marginTop: 5,
    paddingBottom: 5,
    marginLeft: "20%",
  },
  container: {
    left: "2.5%",
    marginTop: "5%",
    flex: 1,
  },
});

export default OrganizerDashboardScreen;
