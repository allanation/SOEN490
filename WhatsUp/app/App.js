import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
//import UserDashboard from "./screens/UserDashboard";
//import OrganizerDashboardScreen from "./screens/OrganizerDashboard";
import SignUpScreen from "./screens/SignUpScreen";
import Login from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();
  //headershown if u dont want the top navbar
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
      </Stack.Navigator>
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
