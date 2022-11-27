import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAwareScrollView,
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
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

function OrganizerDaySchedule({ day }) {
  useEffect(() => {
    const defaultItinerary = [
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
    setItinerary([]);
  }, []);

  const ids = uuid.v4();

  function handleAddingItinerary(e) {
    const newItinerary = {
      title: title,
      startTime: startTime,
      endTime: endTime,
      description: description,
      location: location,
      id: ids,
    };
    setItinerary((itinerary) => [...itinerary, newItinerary]);
    setModalVisible(false);
  }

  const onRemove = (id) => (e) => {
    setItinerary(itinerary.filter((item) => item.id !== id));
  };

  const displayEvents = () => {};
  const [itinerary, setItinerary] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const navigation = useNavigation();

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
      <BackBtn onPress={() => navigation.navigate('DateInfo')} />
      <AddBtn onPress={() => setModalVisible(true)} />
      <ScrollView>
        <View style={{ marginTop: 12 }}>
          <View>
            {itinerary.length == 0 ? (
              <Text
                style={{
                  color: colors.lightGrey,
                  marginLeft: 24,
                  marginTop: 18,
                }}
              >
                'No items in your itinerary yet...'
              </Text>
            ) : (
              itinerary.map((it) => (
                <ItineraryEvent
                  title={it.title}
                  startTime={it.startTime}
                  endTime={it.endTime}
                  location={it.location}
                  onRemove={onRemove}
                  id={it.id}
                />
              ))
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <AppButton
          title={'Next'}
          onPress={() => navigation.navigate('OrgTags')}
        ></AppButton>
      </View>
      <AppModal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <BackBtn
            style={styles.backModal}
            onPress={() => setModalVisible(!modalVisible)}
          />
          <View style={styles.inputView}>
            <ScrollView
              keyboardDismissMode='interactive'
              style={{ width: '100%' }}
            >
              <ScreenTitle style={{ alignSelf: 'center' }} title={'New Item'} />
              <AppTextInput
                placeholder='Title'
                onChangeText={(currentTitle) => setTitle(currentTitle)}
              />
              <AppTextInput
                placeholder='Start Time'
                onChangeText={(currentStartTime) =>
                  setStartTime(currentStartTime)
                }
              />
              <AppTextInput
                placeholder='End Time'
                onChangeText={(currentEndTime) => setEndTime(currentEndTime)}
              />
              <AppTextInput
                placeholder='Description'
                onChangeText={(currentDescription) =>
                  setDescription(currentDescription)
                }
              />
              <AppTextInput
                placeholder='Location (optional)'
                onChangeText={(currentLocation) => setLocation(currentLocation)}
              />
              <AppButton
                title='Add'
                style={{ marginTop: 0 }}
                onPress={handleAddingItinerary}
              />
            </ScrollView>
          </View>
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
    padding: 20,
    paddingTop: 20,
    width: '86%',
    // height: "62%",
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
  inputView: {
    marginTop: 8,
    borderColor: colors.lightGrey,
    borderRadius: 7,
    width: '90%',
    alignSelf: 'center',
    paddingTop: 20,
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
  backModal: {
    backgroundColor: 'black',
  },
});

export default OrganizerDaySchedule;
