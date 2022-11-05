import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
//import UserDashboard from "./screens/UserDashboard";
//import OrganizerDashboardScreen from "./screens/OrganizerDashboard";
import SignUpScreen from './screens/SignUpScreen';
import Login from './screens/Login';
import ResetPassword from './screens/ResetPassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrganizerNewEvent from './screens/OrgNewEvent';
import OrganizerPOC from './screens/OrgPointOfContact';
import OrganizerDateInfo from './screens/OrgDateInfo';
import OrganizerDashboardScreen from './screens/OrgDashboard';
import OrgDaySchedule from './screens/OrgDaySchedule';
import OrgEventTags from './screens/OrgEventTags';
import NewItemPopup from './components/NewItemPopup';

export default function App() {
  const Stack = createNativeStackNavigator();
  //headershown if u dont want the top navbar
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='SignUp'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
        <Stack.Screen name='NewEvent' component={OrganizerNewEvent} />
        <Stack.Screen name='POC' component={OrganizerPOC} />
        <Stack.Screen name='DateInfo' component={OrganizerDateInfo} />
        <Stack.Screen name='OrgDash' component={OrganizerDashboardScreen} />
        <Stack.Screen name='OrgDay' component={OrgDaySchedule} />
        <Stack.Screen name='OrgTags' component={OrgEventTags} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
