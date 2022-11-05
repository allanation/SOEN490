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
import ScreenSubtitle from '../components/ScreenSubtitle';
import ScreenTitle from '../components/ScreenTitle';
import BackBtn from '../components/BackBtn';
import AppTextInput from "../components/AppTextInput";
import { useNavigation } from "@react-navigation/native";

function OrganizeEventTags() {
  const navigation = useNavigation();
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
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: '100%', display: 'flex' }}>
        <ScreenTitle
          style={{ alignSelf: 'center' }}
          title={'Create Event Tags'}
        />
        <ScreenSubtitle
          style={{ alignSelf: 'center' }}
          subtitle='Please fill the following information'
        />
      </View>
      <BackBtn onPress={() => navigation.navigate('OrgDay')}/>
      <ScrollView>
        <AppTextInput placeholder="Ex. University" onChangeText={text => setCurrentTag(text)}/>
        <ScreenSubtitle style= {{paddingHorizontal: 20, color: "gray"}} subtitle="Add tags to increase visibility" />
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
          <AppButton title={"Submit Event"} onPress={() => navigation.navigate('OrgDash')}></AppButton>
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
