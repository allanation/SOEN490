import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import { Ionicons } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import EventTags from '../components/EventTags';
import AppTextInput from '../components/AppTextInput';
function OrganizeEventTags() {
  tags = [{ name: 'University' }, { name: 'Networking' }, { name: 'Student' }];
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
                Add Tags
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
              borderRadius: 20,
              width: 32,
              height: 32,
              justifyContent: 'center',
              shadowColor: 'black', // IOS
              shadowOffset: { height: 1, width: 1 }, // IOS
              shadowOpacity: 0.2, // IOS
              shadowRadius: 3, //IOS
              elevation: 2, // Android
            }}
          >
            <Ionicons
              name='chevron-back-outline'
              size={32}
              color={colors.primary}
            />
          </TouchableOpacity>
          <AppTextInput style={{ marginTop: 40 }}>Ex.: University</AppTextInput>

          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                color: colors.lightGrey,
              }}
            >
              Add tags to increase visibility
            </Text>
          </View>
          <View style={{ marginTop: 12 }}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '95%',
                alignSelf: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {tags ? (
                tags.map((t) => <EventTags name={t.name} />)
              ) : (
                <Text
                  style={{
                    color: colors.lightGrey,
                    marginLeft: 24,
                    marginTop: 18,
                  }}
                >
                  'No tags in your event yet...'
                </Text>
              )}
            </View>
          </View>
          <View>
            <AppButton title={'Submit Event'}></AppButton>
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

export default OrganizeEventTags;
