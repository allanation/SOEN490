import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  ScrollView,
} from 'react-native';
import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import Links from '../components/Links';
import Screen from '../components/Screen';
import Checkbox from 'expo-checkbox';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../components/Search';
import EventBanner from '../components/EventBanner';
import EventImage from '../assets/Logos/w1.png';

function OrganizerDashboardScreen() {
  const Tab = createBottomTabNavigator();
  const user = {
    name: 'George',
  };

  const [date, setDate] = useState(null);
  useEffect(() => {
    let today = new Date();
    let date = today.getMonth() + 1 + '-' + today.getDate();
    setDate(date);
  }, []);

  const events = [
    {
      image: '../assets/Logos/w1.png',
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'Orientation Week',
      organizer: 'Concordia University',
      date: 'May 21, 2022',
    },
  ];
  return (
    <ScrollView>
      <Screen
        style={{ padding: 20, marginTop: 20, backgroundColor: '#F5F5F5' }}
      >
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={{ color: colors.darkGrey }}>
              Today's <Text style={styles.paragraph}>{date}</Text>{' '}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 28 }}>
              Welcome, {user.name}!
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              borderRadius: 250,
              paddingHorizontal: 15,
              backgroundColor: colors.white,
            }}
          >
            <Ionicons name='notifications' size={24} color={colors.primary} />
          </View>
        </View>
        <Text style={styles.eventTitle}>Your Events</Text>
        <View style={styles.searchBar}>
          <Search>Search for...</Search>
          <View style={styles.filter}>
            <Ionicons name='ios-filter' size={24} color={colors.primary} />
          </View>
        </View>
        <View>
          {events.map((n) => {
            return (
              <EventBanner
                image={EventImage}
                title={n.title}
                organizer={n.organizer}
                date={n.date}
              />
            );
          })}
        </View>
      </Screen>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  organizer: {
    alignItems: 'flex-start',
    width: '50%',
  },
  organizertwo: {
    alignItems: 'flex-end',
    width: '50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 48,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filter: {
    justifyContent: 'center',
  },
});

export default OrganizerDashboardScreen;
