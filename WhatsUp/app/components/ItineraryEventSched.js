/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import CardModal from "../components/CardModal";
import UtilBtn from "../components/UtilBtn";
import { Ionicons } from "@expo/vector-icons";

function ItineraryEvent({ title, startTime, endTime, location, description }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <TouchableOpacity
      style={styles.itineraryButton}
      onPress={() => setModalVisible(true)}
    >
      <View>
        <Text style={styles.itineraryTitle} numberOfLines={1}>
          {title.length < 30 ? `${title}` : `${title.substring(0, 28)}...`}
        </Text>
      </View>
      <View style={styles.itineraryDetails}>
        <Text style={{ color: colors.darkGrey }} numberOfLines={1}>
          {startTime} - {endTime}
        </Text>
        <Text style={{ color: colors.darkGrey }} numberOfLines={1}>
          {location.length < 16
            ? `${location}`
            : `${location.substring(0, 14)}...`}
        </Text>
      </View>
      <CardModal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.cardContainer}>
          <UtilBtn
            icon="chevron-back-outline"
            iconSize={20}
            style={{
              backgroundColor: 'white',
              borderRadius: 100,
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 10
            }}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
          <View style={styles.iconText}>
            <Ionicons
              name="ios-location-outline"
              size={20}
              color={colors.primary}
            />
            <Text style={{ marginLeft: 10 }}>{location}</Text>
          </View>
          <View style={styles.iconText}>
            <Ionicons name="ios-time-outline" size={20} color={colors.primary} />
            <Text style={{ marginLeft: 10 }}>{`${startTime} - ${endTime}`}</Text>
          </View>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10, marginBottom: 5}}>Description</Text>
          <Text>{description}</Text>
        </View>
      </CardModal>
    </TouchableOpacity>
  );
}

export default ItineraryEvent;

const styles = StyleSheet.create({
  itineraryButton: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 22,
    width: "90%",
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 6,
  },
  cardContainer: {
    padding: 16
  },
  iconText: {
    flexDirection: "row",
    marginTop: 8,
    marginLeft: 8,
  },
  itineraryTitle: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  itineraryDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: colors.lightGrey,
  },
});
