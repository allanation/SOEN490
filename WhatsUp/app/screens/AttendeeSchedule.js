/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, Text } from "react-native";
import Screen from "../components/Screen";
import ItineraryEventSched from "../components/ItineraryEventSched";
import SearchBar from "../components/SearchBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import PropTypes from "prop-types";

const Tab = createMaterialTopTabNavigator();

AttendeeSchedule.propTypes = {
  route: PropTypes.any,
};

function AttendeeSchedule({ route }) {
  const { prop } = route.params;

  useEffect(() => {
    setMasterData(prop);
  }, []);

  const itinerary = prop;

  const [displayedItinerary, setDisplayedItinerary] = useState(true);
  const [masterData, setMasterData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState("");

  const ItemView = ({ item }) => {
    return (
      <View>
      <Text style={styles.subtitle}>Day {item.day}</Text>
      <FlatList
          data={item.schedule}
          renderItem={DayView}
          style={{}}
        />
      </View>
    );
  };

  const DayView = ({item}) => {
    return(
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
    </>
  );

  return (
    <Screen style={{ padding: "5%", backgroundColor: "white" }}>
      <View style={{ width: "100%", display: "flex" }}>
        <SearchBar
          style={{ width: "85%" }}
          placeholder="Search for event..."
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
  subtitle: {
    padding: 14,
    fontSize: 19,
    fontWeight: "bold",
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
