import { StyleSheet, Text, View, Button } from 'react-native';
import SignUpScreen from './screens/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from './config/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import ResetPassword from './screens/ResetPassword';
import OrgDashboard from './screens/OrgDashboard';
import OrgEventTags from './screens/OrgEventTags';
import OrgDateInfo from './screens/OrgDateInfo';
import OrgDaySchedule from './screens/OrgDaySchedule';
import OrgPointOfContact from './screens/OrgPointOfContact';
import OrgNewEvent from './screens/OrgNewEvent';
import UserDashboard from './screens/UserDashboard';
import AttendeeView from './screens/AttendeeView';

const TabScreen = () => {
  const Tab = createBottomTabNavigator();
  return (
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
      <Tab.Screen name='Organizer' component={OrgDashboard} />
      <Tab.Screen name='Add' component={OrgDashboard} />
      <Tab.Screen name='SignUp' component={SignUpScreen} />
    </Tab.Navigator>
  );
};
export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='SignUp' component={SignUpScreen} />
        <Stack.Screen name='ResetPassword' component={ResetPassword} />
        <Stack.Screen name='NewEvent' component={OrgNewEvent} />
        <Stack.Screen name='POC' component={OrgPointOfContact} />
        <Stack.Screen name='DateInfo' component={OrgDateInfo} />
        <Stack.Screen name='OrgDash' component={OrgDashboard} />
        <Stack.Screen name='OrgDay' component={OrgDaySchedule} />
        <Stack.Screen name='OrgTags' component={OrgEventTags} />
        <Stack.Screen name='Organizer' component={TabScreen} />
        <Stack.Screen name='UserDashboard' component={UserDashboard} />
        <Stack.Screen name='AttendeeView' component={AttendeeView} />
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
