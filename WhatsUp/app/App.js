<<<<<<< HEAD
/* eslint-disable react/react-in-jsx-scope */
import { StyleSheet } from "react-native";
//import UserDashboard from "./screens/UserDashboard";
//import OrganizerDashboardScreen from "./screens/OrganizerDashboard";
import SignUpScreen from "./screens/SignUpScreen";
import Login from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

=======
import { StyleSheet, Text, View, Button } from 'react-native';
import OrganizerDashboardScreen from './screens/OrganizerDashboard';
import SignUpScreen from './screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from './config/colors';
>>>>>>> c7d2936d716cfeda2a1c6abf2ecb5c4853f450f9
export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Organizer') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'SignUp') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            } else if (route.name === 'Add') {
              iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
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
        <Tab.Screen name='Organizer' component={OrganizerDashboardScreen} />
        <Tab.Screen name='Add' component={OrganizerDashboardScreen} />
        <Tab.Screen name='SignUp' component={SignUpScreen} />
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
