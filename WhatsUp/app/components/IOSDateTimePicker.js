import React from 'react';
import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function IOSDateTimePicker() {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
        }}
      >
        <View style={{ width: '50%', justifyContent: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            Start Date
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '60%',
            }}
          >
            <DateTimePicker mode='date' value={new Date()} />
          </View>
        </View>
        <View style={{ width: '50%', justifyContent: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            End Date
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '60%',
            }}
          >
            <DateTimePicker mode='date' value={new Date()} />
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 24,
        }}
      >
        <View style={{ width: '50%', justifyContent: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            Start Time
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '50%',
            }}
          >
            <DateTimePicker mode='time' value={new Date()} minuteInterval='5' />
          </View>
        </View>
        <View style={{ width: '50%', justifyContent: 'center' }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            End Time
          </Text>
          <View
            style={{
              alignSelf: 'center',
              width: '50%',
            }}
          >
            <DateTimePicker mode='time' value={new Date()} minuteInterval='5' />
          </View>
        </View>
      </View>
    </View>
  );
}

export default IOSDateTimePicker;
