import React, { useState } from "react";
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
import colors from "../config/colors";
import CardModal from "../components/CardModal";
import UtilBtn from "../components/UtilBtn";

function ItineraryEvent({ title, startTime, endTime, location }) {
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
          {startTime}-{endTime}
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
        <View style={styles.modalView}>
        <UtilBtn
          icon="chevron-back-outline"
          style={styles.backModal}
          onPress={() => setModalVisible(!modalVisible)}
        />
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
