/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
import TitleHeaders from "../components/TitleHeaders";
import UtilBtn from "../components/UtilBtn";
import AppTextInput from "../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import EventTagsList from "../components/EventTagsList";
import { Storage } from "expo-storage";
import { db, addDoc, collection } from "../firebase";

function OrgReviewEventTags() {
  const navigation = useNavigation();
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const ids = uuid.v4();

  useEffect(() => {
    getEventTagsData();
  }, []);

  const getEventTagsData = async () => {
    try {
      const eventTags = await Storage.getItem({
        key: "tags",
      });
      if (eventTags !== null) {
        const TagsObject = JSON.parse(eventTags);
        console.log("here's your tags");
        console.log(TagsObject);
        if (TagsObject.length != 0) {
          setTags(TagsObject);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const storeTags = async (tags) => {
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

  const submitEvent = async (tags) => {
    if (tags.length == 0) {
      Alert.alert("Error", "Please fill out the tags.");
      return;
    }

    try {
      //Get NewEvent object
      const newEvent = await Storage.getItem({
        key: "newEvent",
      });
      const newEventObject = JSON.parse(newEvent);

      //Get POC object
      const POC = await Storage.getItem({
        key: "POC",
      });
      const POCObject = JSON.parse(POC);

      //Get eventDates object
      const eventDates = await Storage.getItem({
        key: "eventDates",
      });
      const eventDatesObject = JSON.parse(eventDates);

      //Get itinerary object
      const itinerary = await Storage.getItem({
        key: "itinerary",
      });
      const itineraryObject = JSON.parse(itinerary);

      //Save the event to firestore
      await addDoc(collection(db, "events"), {
        eventStatus: "Unapproved",
        eventName: newEventObject.eventName,
        orgName: newEventObject.orgName,
        location: newEventObject.location,
        description: newEventObject.description,
        link: newEventObject.link,
        coverImage: newEventObject.coverImage,
        pocName: POCObject.pocName,
        pocPhoneNum: POCObject.pocPhoneNum,
        pocEmail: POCObject.pocEmail,
        startDate: eventDatesObject.startDate,
        startTime: eventDatesObject.startTime,
        endDate: eventDatesObject.endDate,
        endTime: eventDatesObject.endTime,
        itinerary: itineraryObject,
        tags: tags,
      })
        .then(() => {
          Storage.removeItem({ key: "newEvent" });
          Storage.removeItem({ key: "POC" });
          Storage.removeItem({ key: "eventDates" });
          Storage.removeItem({ key: "itinerary" });
          Storage.removeItem({ key: "tags" });

          Alert.alert("Event Reviewed Succesfully");
          navigation.navigate("Organizer");
        })
        .catch((error) => console.log(error.message));
    } catch (e) {
      console.log(e);
    }
  };
  function handleAddingTag(e) {
    const newTag = { tagname: e.nativeEvent.text, id: ids };
    setCurrentTag("");
    if (!tags.some((tag) => e.nativeEvent.text == tag.tagname)) {
      if (e.nativeEvent.text.length > 0) {
        setTags((tags) => [...tags, newTag]);
      } else {
        console.log("she already goes here!!!");
      }
    } else {
      console.log("hi");
    }
  }

  const onRemove = (id) => () => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <UtilBtn
          icon='chevron-back-outline'
          style={{ position: "absolute", left: 0 }}
          onPress={() => {
            storeTags(tags);
            navigation.navigate("OrgReviewDaySchedule");
          }}
        />
        <TitleHeaders
          style={{ alignSelf: "center" }}
          title={"Edit Event Tags"}
        />
      </View>
      <View style={{ width: "100%", display: "flex" }}>
        <TitleHeaders
          style={{ alignSelf: "center" }}
          isTitle={false}
          title='Please fill the following information'
        />
      </View>
      <ScrollView style={{ paddingTop: 20 }}>
        <AppTextInput
          style={{ fontSize: 18, color: colors.lightGrey }}
          placeholder='Ex.: University'
          autoCapitalize
          clearButtonMode='always'
          onChangeText={(text) => setCurrentTag({ text })}
          value={currentTag.text}
          onSubmitEditing={handleAddingTag}
        />
        <TitleHeaders
          style={{ paddingHorizontal: 20, color: "gray" }}
          isTitle={false}
          title='Add tags to increase visibility'
        />
        <View style={{ marginTop: 12 }}>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              width: "95%",
              alignSelf: "center",
              justifyContent: "flex-start",
            }}
          >
            {tags.length > 0 ? (
              <EventTagsList tags={tags} onRemove={onRemove} />
            ) : (
              <Text
                style={{
                  color: colors.lightGrey,
                  marginLeft: 24,
                  marginTop: 18,
                }}
              >
                No tags in your event yet...
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <AppButton
          title={"Submit Event"}
          onPress={() => submitEvent(tags)}
        ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 20,
    paddingTop: 25,
    width: "86%",
    height: "62%",
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
    display: "flex",
    borderColor: colors.lightGrey,
    borderRadius: 7,
    width: "90%",
    alignSelf: "center",
  },
  inputBox: {
    borderColor: colors.lightGrey,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
    borderStyle: "solid",
    borderWidth: 1,
    marginTop: 40,
  },
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

export default OrgReviewEventTags;
