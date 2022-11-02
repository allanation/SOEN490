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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppTextInput from '../components/AppTextInput';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import BottomImg from '../components/ImgOrgBottom';

function OrganizerNewEvent() {
  const Tab = createBottomTabNavigator();
  const user = {
    name: 'George',
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const [image, setImage] = useState(null);

  return (
    <SafeAreaView>
      <ScrollView>
        <Screen>
          <View style={styles.newEventHeader}>
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
                Create new event
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

          <View>
            <AppTextInput>Event Title</AppTextInput>
            <AppTextInput>Organization Name</AppTextInput>
            <AppTextInput>Location</AppTextInput>
            <AppTextInput>Link for ticket purchase (optional)</AppTextInput>
            <AppTextInput
              multiline={true}
              numberOfLines={5}
              style={{
                height: 100,
                textAlignVertical: 'top',
                color: colors.lightGrey,
              }}
            >
              Description
            </AppTextInput>
            <View style={styles.coverPage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.coverImage} />
              ) : (
                <Text
                  style={{
                    fontSize: 18,
                    width: '90%',
                    color: colors.lightGrey,
                  }}
                >
                  Cover Page
                </Text>
              )}

              <Entypo
                onPress={pickImage}
                name='images'
                size={24}
                color={colors.primary}
                style={styles.icon}
              />
            </View>
            <AppButton title={'Next'}></AppButton>
          </View>
          {/* <BottomImg /> */}
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
  paragraph: { textAlign: 'center' },
  coverImage: {
    width: 150,
    aspectRatio: 4 / 3,
    borderWidth: 0.5,
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
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  },
});

export default OrganizerNewEvent;
