import {
  StyleSheet,
  View,
  ScrollView,
  Platform,
  Text,
  Dimensions,
} from "react-native";
import Screen from "../components/Screen";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import TitleHeaders from "../components/TitleHeaders";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../config/colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

function AttendeeDetails() {
  const tokyoRegion = {
    latitude: 35.6762,
    longitude: 139.6503,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const navigation = useNavigation();
  return (
    <Screen style={{ padding: "5%", backgroundColor: "white" }}>
      <ScrollView style={{ width: "100%", display: "flex" }}>
        <TitleHeaders title={"Orientation Week"} />
        <Text
          style={{ padding: 4, marginBottom: 5 }}
        />
        By Concordia University
        <Text/>
        <View style={styles.iconText}>
          <Ionicons
            name="ios-location-outline"
            size={20}
            color={colors.primary}
          />
          <Text style={{ marginLeft: 10 }}>JMSB 2230</Text>
        </View>
        <View style={styles.iconText}>
          <Ionicons
            name="ios-calendar-outline"
            size={20}
            color={colors.primary}
          />
          <Text style={{ marginLeft: 10 }}>May 21, 2022</Text>
        </View>
        <View style={styles.iconText}>
          <Ionicons name="ios-time-outline" size={20} color={colors.primary} />
          <Text style={{ marginLeft: 10 }}>9:00PM - 11:00PM</Text>
        </View>
        <Text style={styles.text}> Description</Text>
        <Text style={styles.description}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum
        </Text>

        <Text style={styles.text}> Location</Text>
        <View style={{ borderRadius: 20, overflow: "hidden" }}>
          <MapView
            style={styles.map}
            initialRegion={tokyoRegion}
            provider={PROVIDER_GOOGLE}
          >
            <Marker coordinate={tokyoRegion} pinColor={colors.primary} />
          </MapView>
        </View>
        <Text style={styles.text}> Tags</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginLeft: "auto",
  },
  iconText: {
    flexDirection: "row",
    marginTop: 8,
  },
  text: {
    color: "#100101",
    fontSize: 17,
    fontFamily: Platform.OS === "ios" ? "Helvetica Neue" : "sans-serif",
    marginTop: "5%",
    marginBottom: "2%",
  },
  description: {
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
