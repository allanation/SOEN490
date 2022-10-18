import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserDashboard from "../screens/UserDashboard";
import Login from "../screens/login";
import Signup from "../screens/SignUpScreen";
import OrganizerDashboard from "../screens/OrganizerDashboard";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LogIn" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="UserDashboard" component={UserDashboard} />
        <Stack.Screen
          name="OrganizerDashboard"
          component={OrganizerDashboard}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
