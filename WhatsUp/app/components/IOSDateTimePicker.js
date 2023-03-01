import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../config/colors';
import AppButton from './AppButton';
import { storeDates } from '../screens/OrgDetails';

function IOSDateTimePicker() {
  const [startDate, setStartDate] = useState({
    date: new Date(Date.now() + 24 * 60 * 60 * 1000),
    timestamp: Date.now() + 24 * 60 * 60 * 1000,
  });
  const [endDate, setEndDate] = useState({
    date: new Date(),
    timestamp: Date.now() + 24 * 60 * 60 * 1000,
  });
  const [startTime, setStartTime] = useState({
    date: new Date(),
    timestamp: Date.now(),
  });
  const [endTime, setEndTime] = useState({
    date: new Date(),
    timestamp: '',
  });

  const handleSelectStartDate = (e) => {
    setStartDate({
      date: new Date(e.nativeEvent.timestamp),
      timestamp: e.nativeEvent.timestamp,
    });
  };

  const handleSelectEndDate = (e) => {
    setEndDate({
      date: new Date(e.nativeEvent.timestamp),
      timestamp: e.nativeEvent.timestamp,
    });
  };

  const handleSelectEndTime = (e) => {
    setEndTime({
      date: new Date(e.nativeEvent.timestamp),
      timestamp: e.nativeEvent.timestamp,
    });
  };

  const handleSelectStartTime = (e) => {
    setStartTime({
      date: new Date(e.nativeEvent.timestamp),
      timestamp: e.nativeEvent.timestamp,
    });
  };

  const handleAddingEvent = async (startDate, startTime, endDate, endTime) => {
    if (endTime.timestamp == '') {
      Alert.alert('Error', 'Please select a later timestamp');
      return;
    }
    if (
      startDate.timestamp == endDate.timestamp &&
      endTime.timestamp < startTime.timestamp
    ) {
      Alert.alert('Error', 'Cannot end before the event starts');
      return;
    }

    const eventDates = {
      startDate: startDate.timestamp,
      startTime: startTime.timestamp,
      endDate: endDate.timestamp,
      endTime: endTime.timestamp,
    };
    //If every mandatory fields is filled out, store the information and go to next page
    storeDates(eventDates);
  };

  return (
    <View>
      <Text style={styles.text}> Start Date & Time </Text>
      <View style={styles.picker}>
        <DateTimePicker
          style={styles.btn}
          mode='date'
          value={startDate.date}
          onChange={handleSelectStartDate}
          minimumDate={new Date()}
        />
        <DateTimePicker
          display='inline'
          style={styles.btn}
          testID={"startTime"}
          mode='time'
          value={startTime.date}
          minuteInterval='15'
          onChange={handleSelectStartTime}
        />
      </View>
      <View
        style={{
          flex: 1,
          height: 1,
          width: '100%',
          backgroundColor: 'lightgrey',
        }}
      />
      <Text style={styles.text}> End Date & Time </Text>
      <View style={styles.picker}>
        <DateTimePicker
          style={styles.btn}
          mode='date'
          value={endDate.date}
          minimumDate={startDate.date}
          onChange={handleSelectEndDate}
        />
        <DateTimePicker
          display='inline'
          style={styles.btn}
          testID={"endTime"}
          mode='time'
          value={endTime.date}
          minuteInterval='15'
          onChange={handleSelectEndTime}
        />
      </View>
      <AppButton
        title={'Confirm'}
        onPress={() =>
          handleAddingEvent(startDate, startTime, endDate, endTime)
        }
      ></AppButton>
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirectionL: 'row',
  },
  btn: {
    accentColor: 'red',
    width: '40%',
    marginBottom: 10,
  },
  text: {
    paddingTop: 50,
    color: colors.darkerGrey,
    marginTop: 10,
    fontSize: 24,
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
  },
});

export default IOSDateTimePicker;
