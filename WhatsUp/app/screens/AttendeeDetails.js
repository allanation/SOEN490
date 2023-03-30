import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  Dimensions,
} from "react-native";
import React from 'react';
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import TitleHeaders from "../components/TitleHeaders";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from 'prop-types';
import EventTagsList from '../components/EventTagsList';
import { convertStartDate } from "./AttendeeDashboard.js";
import { format } from 'date-fns'

AttendeeDetails.propTypes = {
  route: PropTypes.any,
};

export const convertTime = (number) => {
  return number ? format(new Date(number), "hh:mm aaaaa'm'") : "";
}

const onRemove = () => () => {
  
};

function AttendeeDetails({route}) {
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const { prop } = route.params;

  return (
    <Screen style={{ padding: "5%", backgroundColor: "white" }}>
      <ScrollView style={{ width: "100%", display: "flex" }}>
        <TitleHeaders title={prop.eventName} />
        <Text
          style={{ marginLeft: '1%' ,marginBottom: 5, color: 'silver', marginTop: "1%" }}
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
          { convertStartDate(prop.startDate) == convertStartDate(prop.endDate) ? 
          (<Text style={{ marginLeft: 10 }}>{`${convertStartDate(prop.startDate)}`}</Text>) :
          (<Text style={{ marginLeft: 10 }}>{`${convertStartDate(prop.startDate)} - ${convertStartDate(prop.endDate)}`}</Text>)
          }
        </View>
        <View style={styles.iconText}>
          <Ionicons name="ios-time-outline" size={20} color={colors.primary} />
          <Text style={{ marginLeft: 10 }}>{`${convertTime(prop.startTime)} - ${convertTime(prop.endTime)}`}</Text>
        </View>
        <Text style={styles.text}>Description</Text>
        <Text style={styles.description}>
           {prop.description}
        </Text>

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
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'flex-start',
            }}
          >
          {prop.tags.length > 0 ? (
            <View>
             <Text style={styles.text}>Tags</Text>
              <EventTagsList tags={prop.tags} onRemove={onRemove} />
              </View>
          ):( <Text></Text>)}
            
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
    marginLeft: '1%'
  },
  description: {
    marginLeft: '1%',
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

export default AttendeeDetails;
