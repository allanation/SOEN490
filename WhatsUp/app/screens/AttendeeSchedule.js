import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    ScrollView,
    SafeAreaView,
    Platform,
    Text,
    TouchableOpacity,
    FlatList,
  } from "react-native";
  import Screen from "../components/Screen";
  import AppButton from "../components/AppButton";
  import BottomImg from "../components/ImgOrgBottom";
  import ScreenTitle from "../components/ScreenTitle";
  import ScreenSubtitle from "../components/ScreenSubtitle";
  import BackBtn from "../components/BackBtn";
  import IOSDateTimePicker from "../components/IOSDateTimePicker";
  import AndroidDateTimePicker from "../components/AndroidDateTimePicker";
  import ItineraryEvent from "../components/ItineraryEvent";
  import SearchBar from "react-native-dynamic-search-bar";
  import { useNavigation } from "@react-navigation/native";
  import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
  import Login from "./Login";
  import colors from "../config/colors";
  
  const Tab = createMaterialTopTabNavigator();



  function AttendeeSchedule() {
    const itinerary = [
      {
        title: "Round Table with William",
        startTime: "9:00PM",
        endTime: "10:00PM",
        location: "Auditorium 101",
      },
      {
        title: "Round Table with Paul",
        startTime: "9:00PM",
        endTime: "10:00PM",
        location: "Auditorium 101",
      },
      {
        title: "Round Table with Bob",
        startTime: "9:00PM",
        endTime: "10:00PM",
        location: "Auditorium 101",
      },
      {
        title: "Round Table with Jessica",
        startTime: "9:00PM",
        endTime: "10:00PM",
        location: "Auditorium 101",
      },
    ];

    const days = [
        {
            day: 1,
            schedule: {itinerary},
        },
        {
            day: 2,
            schedule: {itinerary},
        },
        {
            day: 3,
            schedule: {itinerary},
        },
    ];

    const onRemove = (id) => (e) => {
      setItinerary(itinerary.filter((item) => item.id !== id));
    };


  const [displayedItinerary, setDisplayedItinerary] = useState(true);
  const [search, setSearch] = useState("");
  const [masterData, setMasterData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [filteredData, setFilteredData] = useState("");
  const [filteredOrgData, setFilteredOrgData] = useState("");

  const ItemView = ({ item }) => {
    return (
      <ItineraryEvent
        title={item.title}
        startTime={item.startTime}
        endTime={item.endTime}
        location={item.location}
        onRemove={onRemove}
        id={item.id}
      />
    );
  };

  const searchFilter = (text) => {
    if (text && displayedItinerary) {
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
    } else if (text && !displayedItinerary) {
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
      displayedItinerary
        ? setFilteredData(masterData)
        : setFilteredData(previousData);
      setSearch(text);
    }
  };

  const toggleDisplay = (e) => {
    setDisplayedItinerary({ displayedItinerary: !displayedItinerary });
  };

  var dE;
  var tabs;
  var showItinerary;
  if (displayedItinerary) {
    tabs = (
      <>
        <TouchableOpacity
          title="Show Form 1"
          onPress={() => setDisplayedItinerary(true)}
          style={styles.upcoming}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title="Show Form 2"
          onPress={() => setDisplayedItinerary(false)}
          style={styles.previous}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Previous</Text>
        </TouchableOpacity>
      </>
    );

    showItinerary = (
      <>
        <FlatList
          data={filteredData ? filteredData : itinerary}
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
             onPress={() => setDisplayedItinerary(true)}
             style={styles.previous}
           >
             <Text style={{ fontSize: 16, fontWeight: "bold" }}>Upcoming</Text>
           </TouchableOpacity>
           <TouchableOpacity
             title="Show Form 2"
             onPress={() => setDisplayedItinerary(false)}
             style={styles.upcoming}
           >
             <Text style={{ fontSize: 16, fontWeight: "bold" }}>Previous</Text>
           </TouchableOpacity>
         </>
       );
       showItinerary = (
         <>
           <FlatList
             data={filteredData ? filteredData : itinerary}
             renderItem={ItemView}
           />
           <FlatList
             data={filteredOrgData ? filteredOrgData : []}
             renderItem={ItemView}
           />
         </>
       );
     }

    const navigation = useNavigation();
    return (
      <Screen style={{ padding: 20, marginTop: 30 }}>
        <View style={{ width: "100%", display: "flex" }}>
        <SearchBar style={{ width: "85%" }} placeholder="Search for..." onChangeText={(text) => {searchFilter(text);}}/>
        {showItinerary}
          <ScrollView style={{marginBottom: "10%"}}>
            <View style={{ marginTop: 12 }}>
              <View>
                {days.map((d) => {
                    return (
                    <View>
                        <ScreenSubtitle style={{marginTop: "5%", marginBottom: "5%"}} subtitle={"Day " + d.day}/>
                            {d.day == 2 ? (
                                <Text
                                style={{
                                    color: colors.lightGrey,
                                    marginLeft: 24,
                                }}>
                                    There are no activities today
                                </Text>
                                ) : (
                                itinerary.map((it) => (
                                    <ItineraryEvent
                                        title={it.title}
                                        startTime={it.startTime}
                                        endTime={it.endTime}
                                        location={it.location}
                                        onRemove={onRemove}
                                        id={it.id}
                                    />
                                ))
                            )}
                    </View>
                    );
                })}
              </View>
            </View>
          </ScrollView>

        </View>
      </Screen>
    );
  }
  
  const styles = StyleSheet.create({
    newEventHeader: {
      justifyContent: "center",
      marginTop: 8,
      marginBottom: 16,
    },
    headerContent: {
      justifyContent: "flex-start",
      width: "100%",
    },
    icon: {
      marginLeft: "auto",
    },
    coverPage: {
      flexDirection: "row",
      width: "90%",
      alignSelf: "center",
      marginVertical: 10,
    },
    paragraph: { textAlign: "center" },
  });
  
  export default AttendeeSchedule;