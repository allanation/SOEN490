import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Alert } from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import AppTextInput from '../components/AppTextInput';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import AppButton from '../components/AppButton';
import ScreenSubtitle from '../components/ScreenSubtitle';
import ScreenTitle from '../components/ScreenTitle';
import BackBtn from '../components/BackBtn';
import { useNavigation } from '@react-navigation/native';
import { Storage } from 'expo-storage';
import {storage} from '../firebase';
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";

function OrganizerNewEvent() {
  const navigation = useNavigation();
  const [eventName, setEventName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleAddingEvent = async (
    eventName,
    orgName,
    location,
    description,
    coverImage
  ) => {
    if (eventName.length == 0) {
      Alert.alert('Error', 'Please fill out the title.');
      return;
    }
    if (orgName.length == 0) {
      Alert.alert('Error', 'Please fill out the organization name.');
      return;
    }
    if (location.length == 0) {
      Alert.alert('Error', 'Please fill out the location.');
      return;
    }
    if (description.length == 0) {
      Alert.alert('Error', 'Please fill out the description.');
      return;
    }

    const newEvent = {
      eventName: eventName,
      orgName: orgName,
      location: location,
      description: description,
      link: link,
      coverImage: coverImage,
    };

    //If every mandatory fields is filled out, store the information and go to next page
    storeNewEvent(newEvent);
    navigation.navigate('POC');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setCoverImage(result.uri);
    }
  };

  const storeNewEvent = async (newEvent) => {
    try {
      const jsonValue = JSON.stringify(newEvent);
      await Storage.setItem({
        key: 'newEvent',
        value: jsonValue, 
      });
    } catch (e) {
      console.log(e);
    }
  };

  const uploadToStorage = async() => {
    const {uri} = coverImage
    const paths = coverImage.split("/");
    const lastPath = paths[paths.length-1];
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const task = storage()
    .ref(lastPath)
    .putFile(uploadUri);
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: '100%', display: 'flex' }}>
        <ScreenTitle
          style={{ alignSelf: 'center' }}
          title={'Create New Event'}
        />
        <ScreenSubtitle
          style={{ alignSelf: 'center' }}
          subtitle='Please fill the following information'
        />
      </View>
      <BackBtn onPress={() => navigation.navigate('Organizer')} />
      <ScrollView style={{ paddingTop: 20 }}>
        <View>
          <AppTextInput
            placeholder='Event Title'
            onChangeText={(currentEventName) => setEventName(currentEventName)}
          ></AppTextInput>
          <AppTextInput
            placeholder='Organization Name'
            onChangeText={(currentOrgName) => setOrgName(currentOrgName)}
          ></AppTextInput>
          <AppTextInput
            placeholder='Location'
            onChangeText={(currentLocation) => setLocation(currentLocation)}
          ></AppTextInput>
          <AppTextInput
            placeholder='Link for ticket purchase (optional)'
            onChangeText={(currentLink) => setLink(currentLink)}
          ></AppTextInput>
          <AppTextInput
            multiline={true}
            numberOfLines={5}
            style={{
              height: 100,
              textAlignVertical: 'top',
              color: colors.lightGrey,
            }}
            placeholder='Description'
            onChangeText={(currentDescription) =>
              setDescription(currentDescription)
            }
          ></AppTextInput>
          <View style={styles.coverPage}>
            {coverImage ? (
              <View>
                <Image source={{ uri: coverImage }} style={styles.coverImage} />
              </View>
            ) : (
              <Text
                style={{
                  fontSize: 18,
                  width: '90%',
                  color: colors.lightGrey,
                }}
              >
                Add Cover Page
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
        </View>
      </ScrollView>
      <View>
        <AppButton
          title={'Next'}
          onPress={() =>
            handleAddingEvent(
              eventName,
              orgName,
              location,
              description,
              coverImage
            )
          }
        ></AppButton>
      </View>
    </Screen>
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
