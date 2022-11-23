import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import BottomImg from "../components/ImgOrgBottom";
import ScreenTitle from "../components/ScreenTitle";
import ScreenSubtitle from "../components/ScreenSubtitle";
import BackBtn from "../components/BackBtn";
import IOSDateTimePicker from "../components/IOSDateTimePicker";
import AndroidDateTimePicker from "../components/AndroidDateTimePicker";
import { useNavigation } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AttendeeDetails from "./AttendeeDetails";
import AttendeeSchedule from "./AttendeeSchedule";
import colors from "../config/colors";

const Tab = createMaterialTopTabNavigator();

const logoUri =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmgF8uhC7o6A1vXBOf0a45bDY1CJMHbzerNg&usqp=CAU";

function AttendeeView() {
  const navigation = useNavigation();
  return (
    <Screen>
      <Image
        accessibilityLabel="React logo"
        source={{ uri: logoUri }}
        resizeMode="cover"
        style={styles.headerImage}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 16 },
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
          },
        }}
      >
        <Tab.Screen name="Details" component={AttendeeDetails} />
        <Tab.Screen name="Schedule" component={AttendeeSchedule} />
      </Tab.Navigator>
      <View
        style={{
          height: "10%",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingRight: "10%",
        }}
      >
        <AppButton style={styles.btn} title="Buy Tickets" />
        <AppButton style={styles.btn} title="Going" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "30%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  btn: {
    borderRadius: 7,
    height: "80%",
    width: "40%",
    padding: "5%",
    marginVertical: 0,
    alignSelf: "center",
    alignItems: "center",
  },
});

export default AttendeeView;
