import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import Screen from "../components/Screen";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import EventTags from "../components/EventTags";
function OrganizeEventTags() {
  useEffect(() => {
    const defaultTags = [
      { name: "University" },
      { name: "Networking" },
      { name: "Student" },
    ];
    setTags(defaultTags);
  }, []);
  const [tags, setTags] = useState([]);

  function handleAddingTag(e) {
    const newTag = { name: e.nativeEvent.text };
    setTags((tags) => [...tags, newTag]);
  }

  function removePeople(e) {
    this.setState({
      people: this.state.people.filter(function (person) {
        return person !== e.target.value;
      }),
    });
  }

  const [currentTag, setCurrentTag] = useState("");
  return (
    <Screen>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={{
                fontWeight: "bold",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              Add Tags
            </Text>
            <Text style={{ color: colors.darkGrey }}>
              <Text style={styles.paragraph}>
                Please fill the following information
              </Text>
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-start",
            marginLeft: 12,
            marginTop: 18,
            backgroundColor: "white",
            borderRadius: 20,
            width: 32,
            height: 32,
            justifyContent: "center",
            shadowColor: "black", // IOS
            shadowOffset: { height: 1, width: 1 }, // IOS
            shadowOpacity: 0.2, // IOS
            shadowRadius: 3, //IOS
            elevation: 2, // Android
          }}
        >
          <Ionicons
            name="chevron-back-outline"
            size={32}
            color={colors.primary}
          />
        </TouchableOpacity>
        <View style={styles.inputBox}>
          <TextInput
            style={{ fontSize: 18, color: colors.lightGrey }}
            placeholder="Ex.: University"
            onChangeText={(newText) => setCurrentTag(newText)}
            defaultValue={currentTag}
            onSubmitEditing={handleAddingTag}
          />
        </View>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: colors.lightGrey,
            }}
          >
            Add tags to increase visibility
          </Text>
        </View>
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
            {tags ? (
              tags.map((t) => <EventTags name={t.name} />)
            ) : (
              <Text
                style={{
                  color: colors.lightGrey,
                  marginLeft: 24,
                  marginTop: 18,
                }}
              >
                'No tags in your event yet...'
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
        <View>
          <AppButton title={"Submit Event"}></AppButton>
        </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
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

export default OrganizeEventTags;
