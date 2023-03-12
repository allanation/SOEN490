/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import UtilBtn from "../components/UtilBtn";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventScreen from "./EventScreen";
import { getTodayDate } from "./AttendeeDashboard.js";

function OrganizerDashboardScreen() {
  const navigation = useNavigation();

  const [userName, setUserName] = useState("");
  const [allEvents, setAllEvents] = useState([]);
 
  const previousEvents = [];
  const upcomingEvents = [];
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
    
    const q = query(
      collection(db, "events"),
      where("pocEmail", "==", user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        if(Date(doc.data().endDate) <= Date.now){
          upcomingEvents.push(doc.data());
        }else{
          previousEvents.push(doc.data());
        }
      });
   
    }
  };

  var welcome = "Welcome, " + userName + "!";

  const Tab = createMaterialTopTabNavigator();

  useEffect(() => {
    getName();
    getEvents();
  }, []);
    
  return (
    <Screen style={{ padding: 20, marginTop: 10 }}>
      <View style={styles.container}>
         
                <Text style={{ color: colors.darkGrey }}>{getTodayDate()}</Text>
                <View style={styles.header}>
                
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
          
            <Tab.Navigator
          screenOptions={{
          tabBarLabelStyle: { fontSize: 15, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            width: "35%",
            marginRight: "5%",
            marginLeft: "5%",
          },
          tabBarStyle: {
            backgroundColor: colors.offWhite,
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            marginHorizontal: "4%",
          },
          lazy: true
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
    
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    left: "2.5%",
    marginTop: "5%",
    flex: 1,
  },
});

export default OrganizerDashboardScreen;
