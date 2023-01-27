import {
  StyleSheet,
  View,
  Image,
  Linking,
} from "react-native";
import Screen from "../components/Screen";
import TktBtn from "../components/TktBtn";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AttendeeDetails from "./AttendeeDetails";
import AttendeeSchedule from "./AttendeeSchedule";
import colors from "../config/colors";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import UtilBtn from "../components/UtilBtn";

//Might want to find the real type
AttendeeView.propTypes = {
  route: PropTypes.any,
  navigation: PropTypes.any,
};

function AttendeeView({ route, navigation }) {
  const { prop } = route.params;
  const Tab = createMaterialTopTabNavigator();

  const logoUri =
    "https://www.concordia.ca/news/stories/2019/09/12/jmsb-becomes-the-first-business-school-certified-by-women-in-governance/_jcr_content/top-image.img.768.medium.jpg/1568299098646.jpg";

  const [buttonText, setButtonText] = useState("Going");

  const handleGoing = (buttonText) => {
    if (buttonText == "Going") {
      setButtonText("✔ Going");
    } else {
      setButtonText("Going");
    }
  };

  //remove margin -25 when you find why there is top padding (try to remove it)
  return (
    <Screen style={{marginTop: -40, backgroundColor: 'white'}}>
      <Image
        source={{ uri: logoUri }}
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
        <UtilBtn
          icon="ios-bookmark-outline"
          iconSize={20}
          style={styles.toolBtn}
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            width: "35%",
            marginRight: "5%",
            marginLeft: "5%",
          },
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            marginHorizontal: '10%'
          },
          
        }}
      >
        <Tab.Screen name="Details" component={AttendeeDetails} initialParams={{ prop: prop }} />
        <Tab.Screen name="Schedule" component={AttendeeSchedule} initialParams={{ prop: prop.itinerary }} />
      </Tab.Navigator>
      <View
        style={{
          height: "10%",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: "5%",
          borderTopColor: 'silver',
          borderTopWidth: 1,
        }}
      >
        <TktBtn
          style={styles.btn}
          title="Buy Tickets"
          onPress={() => {
            Linking.openURL('http://google.com')
          }}
        />
        <TktBtn
          style={styles.btn}
          title={buttonText}
          onPress={() => {
            handleGoing(buttonText);
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "35%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  btn: {
    borderRadius: 7,
    marginRight: 10,
    height: "65%",
    width: "auto",
    alignItems: "center",
  },
  toolContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    position: 'absolute', 
    marginTop: 70, 
    width: '100%',
    paddingHorizontal: '10%'
  },
  toolBtn: {
    backgroundColor: 'white',
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AttendeeView;
