import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Screen from '../components/Screen';
import colors from '../config/colors';
import AppButton from '../components/AppButton';
import ScreenSubtitle from '../components/ScreenSubtitle';
import ScreenTitle from '../components/ScreenTitle';
import BackBtn from '../components/BackBtn';
import AppTextInput from '../components/AppTextInput';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import EventTagsList from '../components/EventTagsList';

function OrganizeEventTags() {
  const navigation = useNavigation();
  useEffect(() => {
    const defaultTags = [
      { tagname: 'University', id: ids },
      { tagname: 'Networking', id: ids },
      { tagname: 'Student', id: ids },
    ];
    setTags([]);
  }, []);
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  const ids = uuid.v4();

  function handleAddingTag(e) {
    const newTag = { tagname: e.nativeEvent.text, id: ids };
    setTags((tags) => [...tags, newTag]);
  }

  const onRemove = (id) => (e) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  return (
    <Screen style={{ padding: 20, marginTop: 30 }}>
      <View style={{ width: '100%', display: 'flex' }}>
        <ScreenTitle
          style={{ alignSelf: 'center' }}
          title={'Create Event Tags'}
        />
        <ScreenSubtitle
          style={{ alignSelf: 'center' }}
          subtitle='Please fill the following information'
        />
      </View>
      <BackBtn onPress={() => navigation.navigate('OrgDay')} />
      <ScrollView>
        <AppTextInput
          style={{ fontSize: 18, color: colors.lightGrey }}
          placeholder='Ex.: University'
          //onChangeText={(newText) => setCurrentTag(newText)}
          defaultValue={currentTag}
          onSubmitEditing={handleAddingTag}
        />
        <ScreenSubtitle
          style={{ paddingHorizontal: 20, color: 'gray' }}
          subtitle='Add tags to increase visibility'
        />
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
            {tags.length > 0 ? (
              <EventTagsList tags={tags} onRemove={onRemove} />
            ) : (
              <Text
                style={{
                  color: colors.lightGrey,
                  marginLeft: 24,
                  marginTop: 18,
                }}
              >
                No tags in your event yet...
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <View>
        <AppButton
          title={'Submit Event'}
          onPress={() => navigation.navigate('OrgDash')}
        ></AppButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 20,
    paddingTop: 25,
    width: '86%',
    height: '62%',
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
    display: 'flex',
    borderColor: colors.lightGrey,
    borderRadius: 7,
    width: '90%',
    alignSelf: 'center',
  },
  inputBox: {
    borderColor: colors.lightGrey,
    borderRadius: 7,
    paddingVertical: 7,
    paddingHorizontal: 12,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    marginTop: 40,
  },
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
