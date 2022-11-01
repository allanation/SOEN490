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
  Image,
} from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import DateTimePicker from '@react-native-community/datetimepicker';
function OrganizerDateInfo() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Screen>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={{
                  fontWeight: 'bold',
                  fontSize: 18,
                  textAlign: 'center',
                }}
              >
                Set Date Information
              </Text>
              <Text style={{ color: colors.darkGrey }}>
                <Text style={styles.paragraph}>
                  Please fill the following information
                </Text>
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              position: 'absolute',
              alignSelf: 'flex-start',
              marginLeft: 12,
              marginTop: 18,
              backgroundColor: 'white',
              borderRadius: 32,
              width: 32,
              height: 32,
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name='chevron-back-outline'
              size={32}
              color={colors.primary}
            />
          </TouchableOpacity>
          <View>
            <View
              style={{
                backgroundColor: 'blue',
                flexDirection: 'row',
              }}
            >
              <View style={{ width: '50%', justifyContent: 'center' }}>
                <Text style={{ textAlignVertical: 'center' }}>Start Date</Text>
                <DateTimePicker mode='date' value={new Date()} />
              </View>
              <View style={{ width: '50%', justifyContent: 'center' }}>
                <Text>End Date</Text>
                <DateTimePicker mode='date' value={new Date()} />
              </View>
            </View>
            <View>
              <Text>Start Time</Text>
              <DateTimePicker
                mode='time'
                value={new Date()}
                minuteInterval='5'
              />
              <Text>End Time</Text>
              <DateTimePicker
                mode='time'
                value={new Date()}
                minuteInterval='5'
              />
            </View>
            <View>
              <AppButton title={'Next'}></AppButton>
            </View>
          </View>
        </Screen>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newEventHeader: {
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  headerContent: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  icon: {
    marginLeft: 'auto',
  },
  coverPage: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  paragraph: { textAlign: 'center' },
});

export default OrganizerDateInfo;
