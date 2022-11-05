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
import ScreenSubtitle from '../components/ScreenSubtitle';
import ScreenTitle from '../components/ScreenTitle';
import BackBtn from '../components/BackBtn';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

function OrganizerNewEvent() {
  useEffect(() => {
    setEvents(events);
  }, []);
  const navigation = useNavigation();
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

  const ids = uuid.v4();
  const [events, setEvents] = useState([]);
  const [image, setImage] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [location, setLocation] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');

  function handleAddingEvent(e) {
    const newEvent = {
      image: image,
      eventTitle: eventTitle,
      organizationName: organizationName,
      location: location,
      link: link,
      description: description,
      id: ids,
    };
    setEvents((events) => [...events, newEvent]);
  }

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
      <BackBtn onPress={() => navigation.navigate('OrgDash')} />
      <ScrollView>
        <View>
          <AppTextInput
            placeholder='Event Title'
            onChangeText={(currentEventTitle) =>
              setEventTitle(currentEventTitle)
            }
          ></AppTextInput>
          <AppTextInput
            placeholder='Organization Name'
            onChangeText={(currentOrgName) =>
              setOrganizationName(currentOrgName)
            }
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
          onPress={() => (navigation.navigate('POC'), handleAddingEvent)}
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
