import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../config/colors';
import AppButton from './AppButton';

function IOSDateTimePicker() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [today, setToday] = useState(new Date());

  const handleSelectStartDate = (e, date) => {
    setStartDate(e.nativeEvent.timestamp);
    setToday(date);
  };

  const handleSelectEndDate = (e) => {
    setEndDate(e.nativeEvent.timestamp);
  };

  return (
    <View>
      <Text style={styles.text}> Start Date & Time </Text>
      <View style={styles.picker}>
        <DateTimePicker
          style={styles.btn}
          mode='date'
          value={today}
          onChange={handleSelectStartDate}
          minimumDate={new Date()}
        />
        <DateTimePicker
          display='inline'
          style={styles.btn}
          mode='time'
          value={new Date()}
          minuteInterval='15'
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
          value={today}
          minimumDate={startDate}
          onChange={handleSelectEndDate}
        />
        <DateTimePicker
          display='inline'
          style={styles.btn}
          mode='time'
          value={new Date()}
          minuteInterval='15'
        />
      </View>
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
    // backgroundColor: 'red'
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
