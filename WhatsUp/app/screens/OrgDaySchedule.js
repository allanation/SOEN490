import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Screen from '../components/Screen';
import ScreenSubtitle from '../components/ScreenSubtitle';
import ScreenTitle from '../components/ScreenTitle';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import ItineraryEvent from '../components/ItineraryEvent';
import EventTags from '../components/EventTags';
import BackBtn from '../components/BackBtn';
import AddBtn from '../components/AddBtn';
import NewItemPopup from '../components/NewItemPopup';
import AppModal from '../components/AppModal';
import AppTextInput from '../components/AppTextInput';

function OrganizerDaySchedule({ day }) {
  itinerary = [
    {
      title: 'Round Table with William',
      startTime: '9:00PM',
      endTime: '10:00PM',
      location: 'Auditorium 101',
    },
    {
      title: 'Round Table with William',
      startTime: '9:00PM',
      endTime: '10:00PM',
      location: 'Auditorium 101',
    },
    {
      title: 'Round Table with William',
      startTime: '9:00PM',
      endTime: '10:00PM',
      location: 'Auditorium 101',
    },
    {
      title: 'Round Table with William',
      startTime: '9:00PM',
      endTime: '10:00PM',
      location: 'Auditorium 101',
    },
    {
      title: 'Round Table with William',
      startTime: '9:00PM',
      endTime: '10:00PM',
      location: 'Auditorium 101',
    },
    {
      title: 'Round Table with William',
      startTime: '9:00PM',
      endTime: '10:00PM',
      location: 'Auditorium 101',
    },
  ];

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: '100%', display: 'flex' }}>
        <ScreenTitle
          style={{ alignSelf: 'center' }}
          title={'Day ' + (day ? day + ' ' : '') + 'schedule'}
        />
        <ScreenSubtitle
          style={{ alignSelf: 'center' }}
          subtitle='Please fill the following information'
        />
      </View>
      <BackBtn />
      <AddBtn onPress={() => setModalVisible(true)} />
      <ScrollView>
        <View style={{ marginTop: 12 }}>
          <View>
            {itinerary ? (
              itinerary.map((it) => (
                <ItineraryEvent
                  title={it.title}
                  startTime={it.startTime}
                  endTime={it.endTime}
                  location={it.location}
                />
              ))
            ) : (
              <Text
                style={{
                  color: colors.lightGrey,
                  marginLeft: 24,
                  marginTop: 18,
                }}
              >
                'No items in your itinerary yet...'
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <AppButton title={'Next'}></AppButton>
      </View>
      <AppModal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <BackBtn onPress={() => setModalVisible(!modalVisible)} />
          <ScreenTitle title='New Item' />
          <AppTextInput placeholder='Title' />
          <AppTextInput placeholder='Start Time' />
          <AppTextInput placeholder='End Time' />
          <AppTextInput placeholder='Description' />
          <AppTextInput placeholder='Location (optional)' />
          <AppButton title='Add' style={{ marginTop: 12 }} />
        </View>
      </AppModal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 35,
    width: '82%',
    height: '50%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    alignSelf: 'flex-start',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default OrganizerDaySchedule;
