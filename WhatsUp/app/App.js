/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet } from "react-native";
import SignUpScreen from "./screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "./config/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import OrgDashboard from "./screens/OrgDashboard";
import OrgEventTags from "./screens/OrgEventTags";
import OrgDateInfo from "./screens/OrgDateInfo";
import OrgDaySchedule from "./screens/OrgDaySchedule";
import OrgPointOfContact from "./screens/OrgPointOfContact";
import OrgNewEvent from "./screens/OrgNewEvent";
import OrgView from "./screens/OrgView";
import OrgDetails from "./screens/OrgDetails";
import OrgStatus from "./screens/OrgStatus";
import AttendeeDashboard from "./screens/AttendeeDashboard.js";
import AttendeeFavorites from "./screens/AttendeeFavorites.js";
import UserProfile from "./screens/UserProfile";
import AttendeeView from "./screens/AttendeeView";
import OrgReviewEvent from "./screens/OrgReviewEvent";
import OrgReviewPOC from "./screens/OrgReviewPOC";
import OrgReviewDateInfo from "./screens/OrgReviewDateInfo";
import OrgReviewDaySchedule from "./screens/OrgReviewDaySchedule";
import OrgReviewEventTags from "./screens/OrgReviewEventTags";

const TabScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "OrganizerDashboard") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "UserProfile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "Notifs") {
            iconName = focused ? "ios-megaphone" : "ios-megaphone-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="OrganizerDashboard" component={OrgDashboard} />
      <Tab.Screen name="Notifs" component={OrgReviewEvent} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

const AttendeeTabScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "User") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Ticket") {
            iconName = focused ? "ios-barcode" : "ios-barcode-outline";
          } else if (route.name === "Bookmark") {
            iconName = focused ? "ios-bookmark" : "ios-bookmark-outline";
          } else if (route.name === "UserProfile") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primary,
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="User" component={AttendeeDashboard} />
      <Tab.Screen name="Ticket" component={AttendeeDashboard} />
      <Tab.Screen name="Bookmark" component={AttendeeFavorites} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="NewEvent" component={OrgNewEvent} />
        <Stack.Screen name="POC" component={OrgPointOfContact} />
        <Stack.Screen name="DateInfo" component={OrgDateInfo} />
        <Stack.Screen name="OrgDash" component={OrgDashboard} />
        <Stack.Screen name="OrgDay" component={OrgDaySchedule} />
        <Stack.Screen name="OrgTags" component={OrgEventTags} />
        <Stack.Screen name="OrgView" component={OrgView} />
        <Stack.Screen name="OrgDetails" component={OrgDetails} />
        <Stack.Screen name="OrgStatus" component={OrgStatus} />
        <Stack.Screen name="OrgReviewEvent" component={OrgReviewEvent} />
        <Stack.Screen name="OrgReviewPOC" component={OrgReviewPOC} />
        <Stack.Screen name="OrgReviewDateInfo" component={OrgReviewDateInfo} />
        <Stack.Screen
          name="OrgReviewDaySchedule"
          component={OrgReviewDaySchedule}
        />
        <Stack.Screen
          name="OrgReviewEventTags"
          component={OrgReviewEventTags}
        />
        <Stack.Screen name="Organizer" component={TabScreen} />
        <Stack.Screen name="AttendeeDashboard" component={AttendeeDashboard} />
        <Stack.Screen name="Attendee" component={AttendeeTabScreen} />
        <Stack.Screen name="AttendeeView" component={AttendeeView} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// eslint-disable-next-line no-unused-vars
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
