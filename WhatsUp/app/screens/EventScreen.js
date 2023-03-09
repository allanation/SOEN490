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
import { getTodayDate } from "./AttendeeDashboard.js";

function EventScreen({navigation, route}) {
  const navigations = useNavigation();
   
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    const [masterData, setMasterData] = useState([]);
    const [previousData, setPreviousData] = useState([]);
    const [filteredData, setFilteredData] = useState("");
    const [filteredOrgData, setFilteredOrgData] = useState("");
    const [displayedEvent, setDisplayedEvents] = useState(true);

    useEffect(() => {
        setEvents(route.params.events);
        setMasterData(events);
      setPreviousData(events);
      }, []);

    const ItemView = ({ item }) => {
        return (
          <Event
            image={item.coverImage}
            title={item.eventName}
            organizer={item.orgName}
            date={convertStartDate(item.startDate)}
            isOrganizer={true}
            coverImageName={item.coverImage}
            guid={item.guid}
            onPress={() => navigations.navigate("OrgView", { prop: item })}
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
    
          const orgSearch = masterData.filter((item) => {
            const itemData = item.orgName
              ? item.orgName.toUpperCase()
              : "".toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
    
          setFilteredOrgData(orgSearch);
          setFilteredData(newData);
          setSearch(text);
        } else if (text && !displayedEvent) {
          const newData = previousData.filter((item) => {
            const itemData = item.eventName
              ? item.eventName.toUpperCase()
              : "".toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
    
          const orgSearch = previousData.filter((item) => {
            const itemData = item.orgName
              ? item.orgName.toUpperCase()
              : "".toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
    
          setFilteredOrgData(orgSearch);
          setFilteredData(newData);
          setSearch(text);
        } else {
          displayedEvent
            ? setFilteredData(masterData)
            : setFilteredData(previousData);
          setSearch(text);
        }
      };

    var showEvents;
    showEvents = (
        <>
          <FlatList
            data={filteredData ? filteredData : events}
            renderItem={ItemView}
          />
          <FlatList
            data={filteredOrgData ? filteredOrgData : []}
            renderItem={ItemView}
          />
        </>
      );

  return (
    <Screen style={{ padding: 20, marginTop: 10 }}>
    <View style={styles.container}>
    <View style={styles.searchBar}>
            <SearchBar
              placeholder="Search for..."
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
          <Text style={styles.eventTitle}>Your Events</Text>
        
        {showEvents}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
    searchBar: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 18,
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
      marginTop: "2%",
      flex: 1,
    },
  });
export default EventScreen;