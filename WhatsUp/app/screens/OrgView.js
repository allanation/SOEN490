import { StyleSheet, View, Image, Text, Platform, ScrollView, Alert } from "react-native";
import Screen from "../components/Screen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrgDetails from "./OrgDetails";
import OrgStatus from "./OrgStatus";
import AttendeeSchedule from "./AttendeeSchedule";
import colors from "../config/colors";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import UtilBtn from "../components/UtilBtn";
import AppButton from "../components/AppButton";
import { Ionicons } from "@expo/vector-icons";
import AppModal from "../components/AppModal";
import AppTextInput from "../components/AppTextInput";
import TitleHeaders from "../components/TitleHeaders";
import { db } from "../firebase";
import { collection, updateDoc, query, arrayUnion, doc, getDocs, where } from "firebase/firestore";
import { getCoverImageSource } from "./AttendeeView";


OrgView.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.any,
};

function OrgView({ route, navigation }) {
  const { prop } = route.params;
  const Tab = createMaterialTopTabNavigator();

  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [docId, setDocId] = useState("");
  var date = new Date().getTime();

  const getDocId = async () => {
    const q = query(collection(db, "events"), where("guid", "==", prop.guid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setDocId(doc.id);
      });
    }
  };

  const handleSendBlast = async (
    message
  ) => {
    if (message.length == 0) {
      Alert.alert("Error", "Please fill out the message.");
      return;
    }

    const temp = {
      dateSent: date,
      message: message,
    };

    try {
      const eventToNotify = doc(db, "events", docId);
      await updateDoc(eventToNotify, {
        notifications: arrayUnion(temp),
      })
      .catch((error) => console.log(error.message));
    } catch (e) {
        console.log(e);
    }
    setModalVisible(false);
    setMessage("");
    Alert.alert("Message sent successfully.");
  };

  useEffect(() => {
    getDocId();
  }, []);

  return (
    <Screen style={{ backgroundColor: "white" }}>
      <Image
        source={getCoverImageSource(prop.coverImage)}
        resizeMode="cover"
        style={styles.headerImage}
      />

      <View style={styles.toolContainer}>
        <UtilBtn
          icon="chevron-back-outline"
          iconSize={25}
          style={styles.toolBtn}
          onPress={() => navigation.goBack()}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            width: "20%",
            marginRight: "4%",
            marginLeft: "4%",
          },
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            marginHorizontal: "5%",
          },
        }}
      >
        <Tab.Screen
          name="Details"
          component={OrgDetails}
          initialParams={{ prop: prop }}
        />
        <Tab.Screen
          name="Schedule"
          component={AttendeeSchedule}
          initialParams={{ prop: prop.itinerary }}
        />
        <Tab.Screen
          name="Status"
          component={OrgStatus}
          initialParams={{ prop: prop }}
        />
      </Tab.Navigator>
      <View
        style={{
          height: "10%",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: "5%",
          borderTopColor: "silver",
          borderTopWidth: 1,
        }}
      >
        <AppButton
          style={styles.btn}
          title={
            prop.eventStatus === "Rejected" ? (
              "Resubmit"
            ) : (
              <Ionicons
                name="ios-megaphone-outline"
                size={18}
                color={colors.white}
              >
                {" "}
                <Text style={styles.text}>Blast Info</Text>
              </Ionicons>
            )
          }
          onPress={prop.eventStatus === "Rejected" ? () => {navigation.navigate("OrgReviewEvent")}: () => {setModalVisible(true)}}
        />
      </View>
      <AppModal
        animationType="fade"
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
              style={{ position: "absolute" }}
              onPress={() => setModalVisible(!modalVisible)}
            />
            <TitleHeaders style={{ paddingLeft: '27%', marginTop: 5 }} title={"Blast Info"} />
            <Text
              style={{ marginLeft: '1%' ,marginBottom: 5, color: 'silver', marginTop: "5%" }}
            >
              From {prop.eventName} Event
            </Text>
            <ScrollView
              keyboardDismissMode="interactive"
              style={{ width: "100%" }}
            >
              <AppTextInput
                placeholder="Message"
                onChangeText={(currentMessage) =>
                  setMessage(currentMessage)
                }
              />
              <AppButton
                title="Send"
                style={{ marginTop: 10 }}
                onPress={() =>
                  handleSendBlast(
                    message
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
  headerImage: {
    height: "35%",
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: -50,
  },
  btn: {
    borderRadius: 4,
    marginRight: 10,
    height: "58%",
    width: "auto",
  },
  toolContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    marginTop: 70,
    width: "100%",
    paddingHorizontal: "10%",
  },
  toolBtn: {
    backgroundColor: "white",
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    textAlign: "center",
    textAlignVertical: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 35,
    padding: 20,
    paddingTop: 20,
    width: "86%",
    alignItems: "center",
    marginVertical: '50%',
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
});

export default OrgView;
