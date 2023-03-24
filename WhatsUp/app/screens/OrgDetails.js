/* eslint-disable no-unused-vars */
import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  Dimensions,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import TitleHeaders from "../components/TitleHeaders";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import EventTagsList from "../components/EventTagsList";
import { convertStartDate } from "./AttendeeDashboard.js";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";
import { Storage } from "expo-storage";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";

OrgDetails.propTypes = {
  route: PropTypes.any,
};

export const convertTime = (number) => {
  return number ? format(new Date(number), "hh:mm aaaaa'm'") : "";
};

export const storeNewEvent = async (newEvent) => {
  try {
    const jsonValue = JSON.stringify(newEvent);
    await Storage.setItem({
      key: "newEvent",
      value: jsonValue,
    });
  } catch (e) {
    console.log(e);
  }
};

export const storePOC = async (POC) => {
  try {
    const jsonValue = JSON.stringify(POC);
    await Storage.setItem({
      key: "POC",
      value: jsonValue,
    });
  } catch (e) {
    console.log(e);
  }
};

export const storeDates = async (eventDates) => {
  try {
    const jsonValue = JSON.stringify(eventDates);
    await Storage.setItem({
      key: "eventDates",
      value: jsonValue,
    });
  } catch (e) {
    console.log(e);
  }
};

export const storeDay = async (days) => {
  try {
    await Storage.setItem({
      key: "days",
      value: days,
    });
  } catch (e) {
    console.log(e);
  }
};

export const storeItinerary = async (itinerary) => {
  try {
    const jsonValue = JSON.stringify(itinerary);
    await Storage.setItem({
      key: "itinerary",
      value: jsonValue,
    });
  } catch (e) {
    console.log(e);
  }
};

export const storeTags = async (tags) => {
  try {
    const jsonValue = JSON.stringify(tags);
    await Storage.setItem({
      key: "tags",
      value: jsonValue,
    });
  } catch (e) {
    console.log(e);
  }
};

const onRemove = () => () => {};

function OrgDetails({ route }) {
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const { prop } = route.params;
  const navigation = useNavigation();
  const [eventName, setEventName] = useState(prop.eventName);
  const [orgName, setOrgName] = useState(prop.orgName);
  const [location, setLocation] = useState(prop.location);
  const [link, setLink] = useState(prop.link);
  const [description, setDescription] = useState(prop.description);
  const [eventGuid, setEventGuid] = useState(prop.guid);
  const [coverImageName, setCoverImageName] = useState(prop.coverImage);
  const newEvent = {
    eventName: eventName,
    orgName: orgName,
    location: location,
    description: description,
    link: link,
    coverImage: coverImageName,
    guid: eventGuid,
  };

  const deleteEvent = async (eventGuid) => {
    const q = query(collection(db, "events"), where("guid", "==", eventGuid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        try {
          deleteDoc(doc.ref);
          Alert.alert("Event was successfully deleted.");
          navigation.navigate("OrganizerDashboard");
        } catch (e) {
          console.log(e);
        }
      });
    }
  };

  //Point of contact details
  const [pocName, setPocName] = useState(prop.pocName);
  const [pocPhoneNum, setPocPhoneNum] = useState(prop.pocPhoneNum);
  const [pocEmail, setPocEmail] = useState(prop.pocEmail);
  const POC = {
    pocName: pocName,
    pocPhoneNum: pocPhoneNum,
    pocEmail: pocEmail,
  };

  //DateInfo details
  const [startDate, setStartDate] = useState({
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    timestamp: prop.startDate,
  });
  const [endDate, setEndDate] = useState({
    date: new Date(),
    timestamp: prop.endDate,
  });
  const [startTime, setStartTime] = useState({
    date: new Date(),
    timestamp: prop.startTime,
  });
  const [endTime, setEndTime] = useState({
    date: new Date(),
    timestamp: prop.endTime,
  });

  const eventDates = {
    startDate: startDate.timestamp,
    startTime: startTime.timestamp,
    endDate: endDate.timestamp,
    endTime: endTime.timestamp,
  };

  //EventDays useState
  const [days, setDays] = useState(prop.days);

  //Itinerary details
  const [itinerary, setItinerary] = useState(prop.itinerary);

  //EventTags useState
  const [tags, setTags] = useState(prop.tags);

  return (
    <Screen style={{ padding: "5%", backgroundColor: "white" }}>
      <ScrollView style={{ width: "100%", display: "flex" }}>
        <View style={{ flexDirection: "row" }}>
          <TitleHeaders title={prop.eventName} />
          <View style={{ flexDirection: "row", marginLeft: "auto" }}>
            <Ionicons
              name="trash"
              onPress={() =>
                Alert.alert(
                  "Warning",
                  "Your event will be permanently deleted. Are you sure you wish to proceed?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Delete Event",
                      onPress: () => deleteEvent(prop.guid),
                    },
                  ]
                )
              }
              size={20}
              color={colors.primary}
              style={{
                marginBottom: "1.5%",
                alignSelf: "flex-end",
                paddingRight: "5%",
              }}
            />
            <Ionicons
              name="pencil"
              testID="edit-event"
              onPress={() => {
                storeNewEvent(newEvent);
                storePOC(POC);
                storeDates(eventDates);
                storeDay(days);
                storeItinerary(itinerary);
                storeTags(tags);
                navigation.navigate("OrgReviewEvent");
              }}
              size={20}
              color={colors.primary}
              style={{
                marginBottom: "1.5%",
                alignSelf: "flex-end",
              }}
            />
          </View>
        </View>
        <Text
          style={{
            marginLeft: "1%",
            marginBottom: 5,
            color: "silver",
            marginTop: "1%",
          }}
        >
          By {prop.orgName}
        </Text>
        <View style={styles.iconText}>
          <Ionicons
            name="ios-location-outline"
            size={20}
            color={colors.primary}
          />
          <Text style={{ marginLeft: 10 }}>{prop.location}</Text>
        </View>
        <View style={styles.iconText}>
          <Ionicons
            name="ios-calendar-outline"
            size={20}
            color={colors.primary}
          />
          {convertStartDate(prop.startDate) ==
          convertStartDate(prop.endDate) ? (
            <Text style={{ marginLeft: 10 }}>{`${convertStartDate(
              prop.startDate
            )}`}</Text>
          ) : (
            <Text style={{ marginLeft: 10 }}>{`${convertStartDate(
              prop.startDate
            )} - ${convertStartDate(prop.endDate)}`}</Text>
          )}
        </View>
        <View style={styles.iconText}>
          <Ionicons name="ios-time-outline" size={20} color={colors.primary} />
          <Text style={{ marginLeft: 10 }}>{`${convertTime(
            prop.startTime
          )} - ${convertTime(prop.endTime)}`}</Text>
        </View>
        <Text style={styles.text}>Description</Text>
        <Text style={styles.description}>{prop.description}</Text>

        <Text style={styles.text}>Location</Text>
        <View style={{ borderRadius: 20, overflow: "hidden" }}>
          <MapView
            style={styles.map}
            initialRegion={tokyoRegion}
            provider={PROVIDER_GOOGLE}
          >
            <Marker coordinate={tokyoRegion} pinColor={colors.primary} />
          </MapView>
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            width: "95%",
            alignSelf: "center",
            justifyContent: "flex-start",
          }}
        >
          {prop.tags.length > 0 ? (
            <View>
              <Text style={styles.text}>Tags</Text>
              <EventTagsList tags={prop.tags} onRemove={onRemove} />
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  iconText: {
    flexDirection: "row",
    marginTop: 3,
    marginLeft: 8,
  },
  text: {
    color: "#100101",
    fontSize: 17,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "5%",
    marginBottom: "2%",
    marginLeft: "1%",
  },
  description: {
    marginLeft: "1%",
    fontSize: 14,
    alignSelf: "flex-start",
    alignContent: "flex-start",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 4,
    borderRadius: 20,
    overflow: "hidden",
  },
});

export default OrgDetails;
