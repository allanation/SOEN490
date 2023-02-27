/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";
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
import { Storage } from "expo-storage";

function OrgReviewDaySchedule({ day }) {
  const [itinerary, setItinerary] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const navigation = useNavigation();
  const ids = uuid.v4();

  const [filteredData, setFilteredData] = useState("");
  const [filteredOrgData, setFilteredOrgData] = useState("");

  useEffect(() => {
    getItineraryData();
  }, []);

  const getItineraryData = async () => {
    try {
      const itinerary = await Storage.getItem({
        key: "itinerary",
      });
      if (itinerary !== null) {
        const ItineraryObject = JSON.parse(itinerary);
        if (ItineraryObject.length !== 0) {
          setItinerary(ItineraryObject);
        }
      }
    } catch (e) {
      console.log(e);
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
    const newItinerary = {
      title: title,
      startTime: startTime,
      endTime: endTime,
      description: description,
      location: location,
      id: ids,
    };

    setItinerary((itinerary) => [...itinerary, newItinerary]);
    setModalVisible(false);
  };

  const onRemove = (id) => () => {
    setItinerary(itinerary.filter((item) => item.id !== id));
  };

  const onEdit = (newItinerary) => () => {
    setItinerary(itinerary.filter((item) => item.id !== newItinerary.id));
    setItinerary((itinerary) => [...itinerary, newItinerary]);
  };

  const goToTagsPage = async () => {
    //Store the information before leaving page
    storeItinerary(itinerary);
    navigation.navigate("OrgReviewEventTags");
  };

  const storeItinerary = async (itinerary) => {
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

  const ItemView = ({ item }) => {
    return (
      <View>
        <Text style={styles.subtitle}>Day {item.day}</Text>
        <ItineraryEventSched
          title={item.title}
          startTime={item.startTime}
          endTime={item.endTime}
          location={item.location}
          description={item.description}
          id={item.id}
        />
      </View>
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
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: "100%", display: "flex" }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <UtilBtn
            icon='chevron-back-outline'
            onPress={() => {
              storeItinerary(itinerary);
              navigation.navigate("OrgReviewDateInfo");
            }}
            style={{ position: "absolute", left: 0 }}
          />
          <TitleHeaders
            style={{ alignSelf: "center" }}
            title={"Day " + (day ? day + " " : "") + "schedule"}
          />
        </View>

        <TitleHeaders
          style={{ alignSelf: "center" }}
          isTitle={false}
          title='Please fill the following information'
        />
      </View>
      <UtilBtn
        style={{ alignSelf: "flex-end", marginRight: 24 }}
        icon='add-circle'
        onPress={() => setModalVisible(true)}
      />
      <ScrollView>
        <View style={{ marginTop: 12 }}>
          <View>
            {itinerary.length == 0 ? (
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
              itinerary.map((event) => (
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
        <AppButton title={"Next"} onPress={() => goToTagsPage()}></AppButton>
      </View>
      <AppModal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.inputView}>
            <UtilBtn
              icon='chevron-back-outline'
              style={{ position: "absolute" }}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <TitleHeaders style={{ alignSelf: "center" }} title={"New Item"} />
            <ScrollView
              keyboardDismissMode='interactive'
              style={{ width: "100%" }}
            >
              <AppTextInput
                placeholder='Title'
                onChangeText={(currentTitle) => setTitle(currentTitle)}
              />
              <AppTextInput
                placeholder='Start Time'
                onChangeText={(currentStartTime) =>
                  setStartTime(currentStartTime)
                }
              />
              <AppTextInput
                placeholder='End Time'
                onChangeText={(currentEndTime) => setEndTime(currentEndTime)}
              />
              <AppTextInput
                placeholder='Description'
                onChangeText={(currentDescription) =>
                  setDescription(currentDescription)
                }
              />
              <AppTextInput
                placeholder='Location (optional)'
                onChangeText={(currentLocation) => setLocation(currentLocation)}
              />
              <AppButton
                title='Add'
                style={{ marginTop: 0 }}
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
    // height: "62%",
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: "flex-start",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  backModal: {
    backgroundColor: "black",
  },
});

export default OrgReviewDaySchedule;
