/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import Screen from "../components/Screen";
import TitleHeaders from "../components/TitleHeaders";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import ItineraryEvent from "../components/ItineraryEvent";
import UtilBtn from "../components/UtilBtn";
import AppModal from "../components/AppModal";
import AppTextInput from "../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import { storeItinerary } from "./OrgDetails";

function OrganizerDaySchedule({ route }) {
  const [schedule, setSchedule] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const navigation = useNavigation();
  const ids = uuid.v4();
  const {day, i, itinerary} = route.params;

  useEffect(() => {
    getSchedule()
}, []);

  const getSchedule = async () => {
    if(itinerary?.[i-1]){
      setSchedule(itinerary[i-1].schedule)
    }
  };

  const handleAddEvent = async (
    title,
    startTime,
    endTime,
    description,
    location
  ) => {
    if (title.length == 0) {
      Alert.alert("Error", "Please fill out the title.");
      return;
    }
    if (startTime.length == 0) {
      Alert.alert("Error", "Please fill out the start date.");
      return;
    }
    if (endTime.length == 0) {
      Alert.alert("Error", "Please fill out the end date.");
      return;
    }
    if (description.length == 0) {
      Alert.alert("Error", "Please fill out the description.");
      return;
    }
    if (location.length == 0) {
      Alert.alert("Error", "Please fill out the location.");
      return;
    }

    const newSchedule = {
      title: title,
      startTime: startTime,
      endTime: endTime,
      description: description,
      location: location,
      id: ids
    }

    setSchedule((schedule) => [...schedule, newSchedule]);
    setModalVisible(false);
  };

  const addItinerary = async (day,schedule) => {
    const newItinerary = {
      day: day.toString(),
      schedule: schedule,
    };
    if(itinerary?.[i-1]){
      itinerary[i-1] = newItinerary;
    }else{
    itinerary.push(newItinerary);
    }
  };
    

  const onRemove = (id) => () => {
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  const onEdit = (newSchedule) => () => {
    setSchedule(schedule.filter((item) => item.id !== newSchedule.id));
    setSchedule((schedule) => [...schedule, newSchedule]);
  };

  const goToNextPage = async () => {
    //Store the information before leaving page
    if(i==day){
      addItinerary(i, schedule);
      storeItinerary(itinerary);
      navigation.navigate("OrgTags");
    }else{ 
      addItinerary(i, schedule);
      navigation.push("OrgDay", {day: day, i: (i+1), itinerary: itinerary});
    }
  };

  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: "100%", display: "flex" }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <UtilBtn
            icon="chevron-back-outline"
            onPress={() => navigation.goBack()}
            style={{ position: "absolute", left: 0 }}
            testID={"backButton"}
          />
          <TitleHeaders
            style={{ alignSelf: "center" }}
            title={"Day " + (i) + " Schedule"}
          />
        </View>

        <TitleHeaders
          style={{ alignSelf: "center" }}
          isTitle={false}
          title="Please fill the following information"
        />
      </View>
      <UtilBtn
        style={{ alignSelf: "flex-end", marginRight: 24 }}
        icon="add-circle"
        onPress={() => setModalVisible(true)}
        testID={"addDayIcon"}
      />
      <ScrollView>
        <View style={{ marginTop: 12 }}>
          <View>
            {schedule.length == 0 ? (
              <Text
                style={{
                  color: colors.lightGrey,
                  marginLeft: 24,
                  marginTop: 18,
                }}
              >
                'No items in your itinerary yet...'
              </Text>
            ) : (
              schedule.map((event) => (
                <ItineraryEvent
                  title={event.title}
                  startTime={event.startTime}
                  endTime={event.endTime}
                  description={event.description}
                  location={event.location}
                  id={event.id}
                  onRemove={onRemove}
                  onEdit={onEdit}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <AppButton title={"Next"} testID={"nextButton"} onPress={() => goToNextPage()}></AppButton>
      </View>
      <AppModal
        animationType="fade"
        testID={"addDayModal"}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.inputView}>
            <UtilBtn
              icon="chevron-back-outline"
              testID={"goBackModal"}
              style={{ position: "absolute" }}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <TitleHeaders style={{ alignSelf: "center" }} title={"New Item"} />
            <ScrollView
              keyboardDismissMode="interactive"
              style={{ width: "100%" }}
            >
              <AppTextInput
                placeholder="Title"
                style={styles.shadow}
                onChangeText={(currentTitle) => setTitle(currentTitle)}
              />
              <AppTextInput
                placeholder="Start Time"
                style={styles.shadow}
                onChangeText={(currentStartTime) =>
                  setStartTime(currentStartTime)
                }
              />
              <AppTextInput
                placeholder="End Time"
                style={styles.shadow}
                onChangeText={(currentEndTime) => setEndTime(currentEndTime)}
              />
              <AppTextInput
                placeholder="Description"
                style={styles.shadow}
                onChangeText={(currentDescription) =>
                  setDescription(currentDescription)
                }
              />
              <AppTextInput
                placeholder="Location"
                style={styles.shadow}
                onChangeText={(currentLocation) => setLocation(currentLocation)}
              />
              <AppButton
                title="Add"
                style={{ marginTop: 15 }}
                testID={"addDayButton"}
                onPress={() =>
                  handleAddEvent(
                    title,
                    startTime,
                    endTime,
                    description,
                    location
                  )
                }
              />
            </ScrollView>
          </View>
        </View>
      </AppModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 20,
    paddingTop: 20,
    width: "86%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inputView: {
    marginTop: 8,
    borderColor: colors.lightGrey,
    borderRadius: 7,
    width: "90%",
    alignSelf: "center",
    paddingTop: 20,
  },
  shadow: {
    justifyContent: "center",
    shadowColor: "black", // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 0.2, // IOS
    shadowRadius: 3, //IOS
    elevation: 2, // Android
  },
});

export default OrganizerDaySchedule;
