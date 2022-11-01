import { StyleSheet, Text, View, Button } from "react-native";
import OrganizerDashboardScreen from "./screens/OrganizerDashboard";
import SignUpScreen from "./screens/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "./config/colors";
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Organizer") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "SignUp") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            } else if (route.name === "Add") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
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
        <Tab.Screen name="Organizer" component={OrganizerDashboardScreen} />
        <Tab.Screen name="Add" component={OrganizerDashboardScreen} />
        <Tab.Screen name="SignUp" component={SignUpScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
