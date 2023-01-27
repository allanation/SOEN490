/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Screen from '../components/Screen';
import NavButton from '../components/NavButton';
import UtilBtn from '../components/UtilBtn';
import Event from '../components/Event';
import School from '../assets/Icons/stringio.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import SearchBar from "../components/SearchBar";

function UserDashboard() {
  const navigation = useNavigation();
  var date = new Date();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var today = "Today's " + months[date.getMonth()] + ' ' + date.getDate();

  const [userName, setUserName] = useState('');
  const [user] = useAuthState(auth);

  const getName = async () => {
    const q = query(collection(db, 'users'), where('email', '==', user.email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot != null) {
      querySnapshot.forEach((doc) => {
        setUserName(doc.data().firstName);
      });
    }
  };

  getName();

  function getEvents() {
    let eventsInfo = [];
    for (let i = 0; i <= 5; i++) {
      const event = {
        image: { School },
        title: 'Orientation Week',
        organizer: 'Concordia University',
        date: 'May 21, 2022',
        key: i,
      };
      eventsInfo[i] = event;
    }
    return eventsInfo;
  }

  var welcome = 'Welcome, ' + userName + '!';

  const events = getEvents();

  const Tab = createBottomTabNavigator();

  useEffect(() => {
    setMasterData(events);
    setPreviousData(events);
  }, []);

  const [displayedEvent, setDisplayedEvents] = useState(true);
  const [search, setSearch] = useState('');
  const [masterData, setMasterData] = useState([]);
  const [previousData, setPreviousData] = useState([]);
  const [filteredData, setFilteredData] = useState('');
  const [filteredUserData, setFilteredUserData] = useState('');

  const ItemView = ({ item }) => {
    return (
      <Event
        image={School}
        title={item.title}
        organizer={item.organizer}
        date={item.date}
        onPress={() => console.log('Event')}
      />
    );
  };

  const searchFilter = (text) => {
    if (text && displayedEvent) {
      const newData = masterData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const userSearch = masterData.filter((item) => {
        const itemData = item.organizer
          ? item.organizer.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredUserData(userSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    } else {
            displayedEvent
              ? setFilteredData(masterData)
              : setFilteredData(previousData);
            setSearch(text);
          }
          {/**I don't think the following applies for an Attendee, hopefully everything works
              If it doesn't, the else goes below this**/}
          {/**else if (text && !displayedEvent) {
      const newData = previousData.filter((item) => {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      const userSearch = previousData.filter((item) => {
        const itemData = item.organizer
          ? item.organizer.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilteredUserData(userSearch);
      setFilteredData(newData);
      console.log(filteredData);
      setSearch(text);
    }**/}
  };

  const toggleDisplay = (e) => {
    setDisplayedEvents({ displayedEvent: !displayedEvent });
  };

  {/**I don't think the following applies for an Attendee, hopefully everything works}**/}
  {/**var tabs;**/}
  var showEvents;
  {/**if (displayedEvent) {
    tabs = (
      <>
        <TouchableOpacity
          title='Show Form 1'
          onPress={() => setDisplayedEvents(true)}
          style={styles.upcoming}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title='Show Form 2'
          onPress={() => setDisplayedEvents(false)}
          style={styles.previous}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Previous</Text>
        </TouchableOpacity>
      </>
    );**/}
    showEvents = (
      <>
        <FlatList
          data={filteredData ? filteredData : events}
          renderItem={ItemView}
          style={{}}
        />
        <FlatList
          data={filteredUserData ? filteredUserData : []}
          renderItem={ItemView}
        />
      </>
    );
  {/**} else {
    {/**tabs = (
      <>
        <TouchableOpacity
          title='Show Form 1'
          onPress={() => setDisplayedEvents(true)}
          style={styles.previous}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity
          title='Show Form 2'
          onPress={() => setDisplayedEvents(false)}
          style={styles.upcoming}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Previous</Text>
        </TouchableOpacity>
      </>
    );
    showEvents = (
      <>
        <FlatList
          data={filteredData ? filteredData : events}
          renderItem={ItemView}
        />
        <FlatList
          data={filteredUserData ? filteredUserData : []}
          renderItem={ItemView}
        />
      </>
    );
  **/}

  return (
    <Screen style={{ padding: 20, backgroundColor: '#F5F5F5' }}>
      <View style={{ left: '2.5%', marginTop: '5%', bottom: "5%" }}>
        <View style={{ flexDirection: 'row' }}>
          <UtilBtn
            icon='pin'
            iconSize={18}
            title='Montreal, QC'
            testID='location'
          />
          <UtilBtn
            style={{ position: 'absolute', right: 16 }}
            icon='notifications'
            iconSize={24}
            title=''
            onPress={() => console.log('Notification')}
            testID='notification'
          />
        </View>

        <Text style={styles.date}>{today}</Text>

        <Text style={styles.title}>{welcome}</Text>

        <View style={{ flexDirection: 'row' }}>
          <SearchBar
            style={{ width: '85%' }}
            placeholder='Search for...'
            handleChange={(text) => {
              searchFilter(text);
            }}
          />
          <UtilBtn
            iconSize={32}
            style={[
              styles.button,
              { flexDirection: 'row', paddingHorizontal: 12, marginTop: 5 },
            ]}
            icon='ios-options'
            testID="filters"
            onPress={() => console.log('Filters')}
          />
        </View>

        <Text style={styles.text}>Popular Events</Text>
      </View>
      {showEvents}
    </Screen>
  );
}

const styles = StyleSheet.create({
  organizer: {
    alignItems: 'flex-start',
    width: '50%',
  },
  organizertwo: {
    alignItems: 'flex-start',
    width: '30%',
  },
  title: {
    color: '#100101',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 8
  },
  date: {
    color: '#969696',
    marginTop: '5%',
    fontSize: 12,
  },
  text: {
    color: '#100101',
    marginTop: '4%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    position: 'absolute',
    bottom: '-1.4%',
    backgroundColor: '#FFFFFF',
    borderColor: '#969696',
    paddingHorizontal: '10%',
    width: '113%',
    height: '7%',
    marginVertical: '1.4%',
    borderStyle: 'solid',
    borderWidth: 0.25,
    shadowColor: 'black',
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default UserDashboard;
