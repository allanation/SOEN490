import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
} from "react-native";
import Screen from "../components/Screen";
import ItineraryEventSched from "../components/ItineraryEventSched";
import SearchBar from "../components/SearchBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PropTypes from 'prop-types';

const Tab = createMaterialTopTabNavigator();

AttendeeSchedule.propTypes = {
  route: PropTypes.any,
};

function AttendeeSchedule({ route }) {
  const { prop } = route.params;

  useEffect(() => {
    setMasterData(prop);
  }, []);

  const itinerary = prop 

  const [displayedItinerary, setDisplayedItinerary] = useState(true);
  const [masterData, setMasterData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [filteredData, setFilteredData] = useState("");
  const [filteredOrgData, setFilteredOrgData] = useState("");

  const ItemView = ({ item }) => {
    return (
      <ItineraryEventSched
        title={item.title}
        startTime={item.startTime}
        endTime={item.endTime}
        location={item.location}
        description={item.description}
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
    } else {
            displayedItinerary
              ? setFilteredData(masterData)
              : setFilteredData(previousData);
            setSearch(text);
          }
  };

  var showItinerary;
 
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

  return (
      <Screen style={{ padding: "5%", backgroundColor: "white" }}>
        <View style={{ width: "100%", display: "flex" }}>
          <SearchBar
            style={{ width: "85%" }}
            placeholder="Search for..."
            handleChange={(text) => {
              searchFilter(text);
            }}
          />
        </View>
        {showItinerary}
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
