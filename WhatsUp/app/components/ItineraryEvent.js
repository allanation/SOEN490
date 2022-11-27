import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import colors from '../config/colors';
import AppModal from './AppModal';
import { Ionicons } from '@expo/vector-icons';
import BackBtn from '../components/BackBtn';
import { ScrollView } from 'react-native';
import ScreenSubtitle from '../components/ScreenSubtitle';
import ScreenTitle from '../components/ScreenTitle';
import AppTextInput from './AppTextInput';
import AppButton from './AppButton';
import uuid from 'react-native-uuid';
function ItineraryEvent({
  title,
  startTime,
  endTime,
  description,
  location,
  id,
  onRemove,
}) {
  // const handleEdit = (e) => {
  //   console.log('editing');
  // };
  const [itinerary, setItinerary] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [etitle, setETitle] = useState(title);
  const [estartTime, setEStartTime] = useState(startTime);
  const [eendTime, setEEndTime] = useState(endTime);
  const [edescription, setEDescription] = useState(description);
  const [elocation, setELocation] = useState(location);
  const ids = uuid.v4();
  function handleEdit(e) {
    const editItinerary = {
      title: title,
      startTime: startTime,
      endTime: endTime,
      description: description,
      location: location,
      id: ids,
    };
    setItinerary((itinerary) => [...itinerary, editItinerary]);
    setModalVisible(true);
    console.log('editing', id);
  }
  return (
    <TouchableOpacity style={styles.itineraryButton} onPress={handleEdit}>
      <View style={styles.itineraryDetails}>
        <Text style={styles.itineraryTitle} numberOfLines={1}>
          {title.length < 30 ? `${etitle}` : `${etitle.substring(0, 28)}...`}
        </Text>
        <Ionicons
          name='close-outline'
          size={24}
          onPress={onRemove(id)}
        ></Ionicons>
      </View>
      <View style={styles.itineraryDetails}>
        <Text style={{ color: colors.darkGrey }} numberOfLines={1}>
          {estartTime}-{eendTime}
        </Text>
        <Text style={{ color: colors.darkGrey }} numberOfLines={1}>
          {elocation.length < 16
            ? `${elocation}`
            : `${elocation.substring(0, 14)}...`}
        </Text>
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
              <ScreenTitle
                style={{ alignSelf: 'center' }}
                title={'Edit Item'}
              />
              <AppTextInput
                placeholder='Title'
                value={etitle ? etitle : console.log('no title')}
                onChangeText={(currentTitle) => setETitle(currentTitle)}
              />
              <AppTextInput
                placeholder='Start Time'
                value={estartTime ? estartTime : console.log('no start time')}
                onChangeText={(currentStartTime) =>
                  setEStartTime(currentStartTime)
                }
              />
              <AppTextInput
                placeholder='End Time'
                value={eendTime ? eendTime : console.log('no end time')}
                onChangeText={(currentEndTime) => setEEndTime(currentEndTime)}
              />
              <AppTextInput
                placeholder='Description'
                value={
                  edescription ? edescription : console.log('no description')
                }
                onChangeText={(currentDescription) =>
                  setEDescription(currentDescription)
                }
              />
              <AppTextInput
                placeholder='Location (optional)'
                value={elocation ? elocation : console.log('no location')}
                onChangeText={(currentLocation) =>
                  setELocation(currentLocation)
                }
              />
              <AppButton
                title='Edit'
                style={{ marginTop: 0 }}
                onPress={() => setModalVisible(false)}
              />
            </ScrollView>
          </View>
        </View>
      </AppModal>
    </TouchableOpacity>
  );
}

export default ItineraryEvent;

const styles = StyleSheet.create({
  itineraryButton: {
    borderWidth: 3,
    borderColor: colors.primary,
    borderRadius: 22,
    width: '90%',
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginVertical: 6,
  },
  itineraryTitle: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  itineraryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: colors.lightGrey,
  },
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
