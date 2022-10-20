import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Touchable,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../components/Search';
import EventBanner from '../components/EventBanner';
import EventImage from '../assets/Logos/w1.png';
import SearchBar from 'react-native-dynamic-search-bar';

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
    setMasterData(events);
  }, []);

  const events = [
    {
      image: '../assets/Logos/w1.png',
      title: 'Slay of the Week',
      organizer: 'Ari',
      date: 'May 21, 2020',
    },
    {
      image: { EventImage },
      title: 'Orientation Semaine',
      organizer: 'ETS',
      date: 'May 21, 2022',
    },
    {
      image: { EventImage },
      title: 'FROSH',
      organizer: 'Concordia University',
      date: 'May 21, 2023',
    },
    {
      image: { EventImage },
      title: 'Orientation Week',
      organizer: 'mcgill',
      date: 'May 21, 2024',
    },
  ];

  const eventsPast = [
    {
      image: '../assets/Logos/w1.png',
      title: 'HOE',
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

  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchItems, setSearchItems] = React.useState([]);
  const [eventView, setEventView] = useState(true);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [filteredData, setFilteredData] = useState('');
  // const ItemView = ({ item }) => {
  //   return <Text>Good Parts</Text>;
  // };

  const ItemView = ({ item }) => {
    return (
      <EventBanner
        image={EventImage}
        title={item.title}
        organizer={item.organizer}
        date={item.date}
      />
    );
  };

  // const ItemSeparatorView = () => {
  //   return (
  //     <View>
  //       <Text>i'm separating</Text>
  //     </View>
  //   );
  // };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else {
      setFilteredData(masterData);
      setSearch(text);
    }
  };

  // for past and upcoming events use useStates and a conditional mapping
  return (
    <SafeAreaView>
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
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                borderRadius: 250,
                paddingHorizontal: 15,
                backgroundColor: colors.white,
              }}
            >
              <Ionicons name='notifications' size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.searchBar}>
            <SearchBar
              style={{ width: '85%' }}
              placeholder='Search for...'
              onChangeText={(text) => {
                searchFilter(text);
              }}
            />
            <TouchableOpacity style={styles.filter}>
              <Ionicons name='ios-filter' size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.eventTitle}>Your Events</Text>
          <FlatList
            data={filteredData ? filteredData : events}
            renderItem={ItemView}
          ></FlatList>
        </Screen>
      </ScrollView>
    </SafeAreaView>
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
    fontSize: 18,
    marginTop: 24,
  },
  searchBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
  },
  filter: {
    justifyContent: 'center',
  },
});

export default OrganizerDashboardScreen;
